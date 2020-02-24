#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

if ! command -v gcloud >/dev/null; then
  echo "gcloud command not found. Please install gcloud"
  echo "See https://cloud.google.com/sdk"
fi

if ! command -v kubectl >/dev/null; then
  echo "kubectl command not found. Please install kubectl"
  echo "See https://kubernetes.io/docs/tasks/tools/install-kubectl/"
fi

# shellcheck source=../.env
source .env

CLUSTER_NAME="spotlight-cluster"

echo '>>> Initializing Terraform...'
terraform init
printf '>>> Applying Terrafrom configuration to %s project...\n' "${GOOGLE_PROJECT}"
terraform apply

ZONE="$(terraform output zone)"
printf '>>> Ensure %s is set as default project...\n' "${GOOGLE_PROJECT}"
gcloud config set project "${GOOGLE_PROJECT}"
echo '>>> Retrieving Kubeconfig from cluster...'
gcloud container clusters get-credentials "${CLUSTER_NAME}" --region "${ZONE}"
echo '>>> Set kubectl context to GKE cluster...'
kubectl config use-context "gke_${GOOGLE_PROJECT}_${ZONE}_${CLUSTER_NAME}"
echo '>>> Creating dynamic Kubernetes configurations...'
./scripts/create-dynamic-configs.sh
echo '>>> Deploying application...'
kubectl apply -f kubernetes
echo '>>> Done! Your application should be available at this URL in a few minutes:'
printf 'http://%s\n' "$(terraform output endpoint)"