resource "google_project_service" "sqladmin_api" {
  service = "sqladmin.googleapis.com"
}

resource "random_id" "db-name" {
  byte_length = 2
}

resource "google_sql_database_instance" "primary" {
  name             = "spotlight-db-${random_id.db-name.hex}"
  database_version = "POSTGRES_9_6"

  settings {
    tier              = "db-f1-micro"
    availability_type = "REGIONAL"

    backup_configuration {
      enabled    = true
      start_time = "03:00"
    }

    ip_configuration {
      ipv4_enabled    = "false"
      private_network = google_compute_network.network.self_link
    }

    disk_autoresize = true

    location_preference {
      zone = data.google_compute_zones.available.names[0]
    }

    maintenance_window {
      day          = "7"
      hour         = "4"
      update_track = "stable"
    }
  }

  depends_on = [
    google_project_service.sqladmin_api,
    google_service_networking_connection.cloud_sql,
  ]
}

resource "google_sql_database" "default" {
  name       = "spotlight"
  instance   = google_sql_database_instance.primary.name
  depends_on = [google_sql_database_instance.primary]
}

resource "random_id" "user-password" {
  byte_length = 8
}

resource "google_sql_user" "default" {
  name       = "spotlight"
  instance   = google_sql_database_instance.primary.name
  password   = random_id.user-password.hex
  depends_on = [google_sql_database_instance.primary]
}
