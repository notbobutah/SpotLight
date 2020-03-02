#!/usr/bin/env bash
set -euo pipefail

if ! command -v gcloud >/dev/null; then
  echo "gcloud command not found. Please install gcloud"
  echo "See https://cloud.google.com/sdk"
fi

generate_random_lowercase_string() {
  local length="${1}"

  dd if=/dev/urandom bs="$(( length * 2 ))" count=1 2>/dev/null \
    | base64 | tr -d "=+/[:space:]" | tr '[:upper:]' '[:lower:]' \
    | dd bs="${length}" count=1 2>/dev/null
}

main() {
  local sa_name="terraform"
  local sa_email="${sa_name}@${GOOGLE_PROJECT}.iam.gserviceaccount.com"
  local -a service_apis=(
    storage-api.googleapis.com
    compute.googleapis.com
    serviceusage.googleapis.com
    cloudresourcemanager.googleapis.com
         
  )
  local -a firewall_rules=()

  echo '>>> Creating GCP project...'
  gcloud projects create "${GOOGLE_PROJECT}"

  echo '>>> Linking project to billing account...'
  gcloud beta billing projects link "${GOOGLE_PROJECT}" \
    --billing-account "${GOOGLE_BILLING_ACCOUNT}"

  echo '>>> Setting project as default...'
  gcloud config set project "${GOOGLE_PROJECT}"

  echo '>>> Enabling required service APIs...'
  gcloud services enable "${service_apis[@]}"

  echo '>>> Deleting default network...'
  while IFS="" read -r rule; do firewall_rules+=("${rule}"); done < <(
    gcloud compute firewall-rules list \
      --filter=network:default --format="value(name)"
  )
  gcloud compute firewall-rules delete "${firewall_rules[@]}"
  gcloud compute networks delete default

  echo '>>> Creating Terraform IAM account...'
  gcloud iam service-accounts create "${sa_name}" \
    --display-name "Terraform admin account"

  echo '>>> Creating Terraform credentials...'
  gcloud iam service-accounts keys create "${GOOGLE_APPLICATION_CREDENTIALS}" \
    --iam-account "${sa_email}"

  echo '>>> Granting project ownership to Terraform...'
  gcloud projects add-iam-policy-binding "${GOOGLE_PROJECT}" \
    --member "serviceAccount:${sa_email}" \
    --role roles/owner

  echo '>>> Granting Storage Admin role to Terraform...'
  gcloud projects add-iam-policy-binding "${GOOGLE_PROJECT}" \
    --member "serviceAccount:${sa_email}" \
    --role roles/storage.admin

  echo '>>> Creating GCS bucket for Terraform remote state...'
  gsutil mb -p "${GOOGLE_PROJECT}" -l "${GOOGLE_REGION}" "gs://${GOOGLE_PROJECT}-tf-state"

  echo '>>> Writing Terraform backend configuration to backend_override.tf...'
  cat > "${ROOT_DIR}/backend_override.tf" <<EOF
terraform {
  backend "gcs" {
    bucket = "${GOOGLE_PROJECT}-tf-state"
  }
}
EOF

  echo '>>> Writing environment variables to .env...'
  cat > "${ROOT_DIR}/.env" <<-EOF
export GOOGLE_PROJECT="${GOOGLE_PROJECT}"
export GOOGLE_APPLICATION_CREDENTIALS="\${HOME}/.config/gcloud/\${GOOGLE_PROJECT}-terraform-admin.json"
export GOOGLE_REGION="${GOOGLE_REGION}"
EOF

  echo '>>> Done! You can now source the .env file to use terraform.'
}

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Use GOOGLE_BILLING_ACCOUNT env var or use first ID found
GOOGLE_BILLING_ACCOUNT=${GOOGLE_BILLING_ACCOUNT:-$(
  gcloud beta billing accounts list --format="value(name)" --limit 1
)}
GOOGLE_PROJECT="spotlight-deployment-$(generate_random_lowercase_string 7)"
GOOGLE_APPLICATION_CREDENTIALS="${HOME}/.config/gcloud/${GOOGLE_PROJECT}-terraform-admin.json"
GOOGLE_REGION="${GOOGLE_REGION:-"us-central1"}"
export GOOGLE_PROJECT GOOGLE_APPLICATION_CREDENTIALS GOOGLE_REGION

main

exit 0