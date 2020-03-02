set -euo pipefail

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# shellcheck source=../.env
source "${ROOT_DIR}/.env"

printf '>>> Ensure %s is set as default project...\n' "${GOOGLE_PROJECT}"
gcloud config set project "${GOOGLE_PROJECT}"

printf '>>> Deleting endpoints for project %s...\n' "${GOOGLE_PROJECT}"
#temp_ep=`gcloud endpoints services list` || true
#gcloud endpoints services delete "${temp_ep}" || true

printf '>>> Deleting Google project %s...\n' "${GOOGLE_PROJECT}"
gcloud projects delete "${GOOGLE_PROJECT}"

echo '>>> Removing Terraform data...'
rm -rf "${ROOT_DIR}/.terraform"

exit 0