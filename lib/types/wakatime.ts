export interface WakaTimeLanguage {
  name: string
  percent: number
  total_seconds: number
  text: string
}
export interface WakaTimeEditor {
  name: string
  percent: number
  text: string
  hours: number
  minutes: number
  // include other fields like 'digital' or 'decimal' if you need them
}
export interface WakaTimeStats {
  text: string
  all_time_text?: string
  human_readable_daily_average: string
  // Add this new field from your API log
  human_readable_daily_average_including_other_language?: string
  human_readable_total: string
  human_readable_total_including_other_language?: string
  languages: WakaTimeLanguage[]
  modified_at: string
  range: {
    start_date: string
    end_date: string
  }
  editors: {
    name: string
    percent: number
    text: string
  }[]
}
