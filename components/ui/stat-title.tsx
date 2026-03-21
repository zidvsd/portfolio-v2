import { Card, CardHeader, CardContent } from "./card"
export default function StatTile({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
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
