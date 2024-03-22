# Monitoring System with Grafana, Prometheus, and Loki

This monitoring system utilizes Grafana, Prometheus, and Loki to analyze an Express server. It provides insights into latency, total requests, memory usage, CPU usage, and more. Docker is used to run containers for Grafana and Prometheus, making it easy to deploy and manage the monitoring system.

## Tools Used

- **Grafana**: Grafana is used for visualization and monitoring. It provides a rich set of features for creating dashboards and visualizing data from various sources.

- **Prometheus**: Prometheus is a monitoring and alerting toolkit. It collects metrics from monitored targets by scraping HTTP endpoints and stores them in a time series database.

- **Loki**: Loki is used for log aggregation. It is designed to be cost-effective and easy to operate, as it does not index the contents of the logs but rather a set of labels for each log stream.

- **Docker**: Docker is used to run containers for Grafana and Prometheus. Containers provide a lightweight and portable way to package applications and their dependencies.

## How It Works

1. **Grafana**: Grafana connects to Prometheus as a data source to visualize metrics collected from the Express server. Dashboards are created in Grafana to display metrics such as latency, total requests, memory usage, CPU usage, etc.

2. **Prometheus**: Prometheus scrapes metrics from the Express server at regular intervals. These metrics are stored in a time series database and can be queried for monitoring and alerting purposes.

3. **Loki**: Loki collects logs from the Express server and stores them for analysis. It allows for easy log aggregation and querying, enabling developers to troubleshoot issues and monitor system behavior.

## Images
![Alt text](https://github.com/pavannaik321/Monitor_Express/blob/main/Screenshot%202024-03-21%20at%2010.52.47%20PM.png?raw=true)

![Alt text](https://github.com/pavannaik321/Monitor_Express/blob/main/Screenshot%202024-03-21%20at%2010.53.09%20PM.png?raw=true)


## Where It Will Be Used

This monitoring system can be used in any environment where monitoring and analysis of an Express server are required. It is particularly useful in production environments where real-time monitoring and alerting are essential for maintaining system health and performance.
