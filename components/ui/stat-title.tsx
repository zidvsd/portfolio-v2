import { ReactNode } from "react"
import { Card, CardHeader, CardContent } from "./card"

export default function StatTile({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string
  value: string
  icon?: ReactNode
  highlight?: boolean
}) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="pt-0">
        <p
          className={`text-lg font-semibold ${
            highlight ? "text-chart-3" : "text-foreground"
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
