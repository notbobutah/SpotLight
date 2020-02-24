resource "google_project_service" "container_api" {
  service = "container.googleapis.com"
}

resource "google_container_cluster" "primary" {
  name       = "spotlight-cluster"
  location   = data.google_compute_zones.available.names[0]
  network    = google_compute_network.network.self_link
  subnetwork = google_compute_subnetwork.subnet-gke.self_link

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true

  initial_node_count = 1

  # Setting an empty username and password explicitly disables basic auth
  master_auth {
    username = ""
    password = ""
  }

  # Restrict to a VPN for example
  # or if the VPN in inside GCP,
  # route the VPN internally
  # and remove the master's external endpoint
  master_authorized_networks_config {
    cidr_blocks {
      cidr_block   = "0.0.0.0/0"
      display_name = "all"
    }
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = google_compute_subnetwork.subnet-gke.secondary_ip_range[0].range_name
    services_secondary_range_name = google_compute_subnetwork.subnet-gke.secondary_ip_range[1].range_name
  }

  private_cluster_config {
    enable_private_nodes   = true
    master_ipv4_cidr_block = "10.99.0.0/28"
  }

  depends_on = [google_project_service.container_api]
}

resource "google_container_node_pool" "primary" {
  name       = "lofacats-node-pool"
  location   = data.google_compute_zones.available.names[0]
  cluster    = google_container_cluster.primary.name
  node_count = 2

  node_config {
    # preemptible migth not be suitable for production
    # but for this example, it should be enough
    # https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms
    preemptible = true

    machine_type = "n1-highcpu-2"

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}
