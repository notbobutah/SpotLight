set -euo pipefail

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# shellcheck source=../.env
source "${ROOT_DIR}/.env"

printf '>>> Deleting Google project %s...\n' "${GOOGLE_PROJECT}"
gcloud projects delete "${GOOGLE_PROJECT}"

# gcloud endpoints services list
# gcloud endpoints services delete SERVICE_NAME

echo '>>> Removing Terraform data...'
rm -rf "${ROOT_DIR}/.terraform"

exit 0