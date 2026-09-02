import axios from 'axios'

export interface HealthStatus {
  status: string
  app: string
  environment: string
}

export async function fetchHealth(): Promise<HealthStatus> {
  const response = await axios.get<HealthStatus>('/api/health')
  return response.data
}
