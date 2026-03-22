import { Card, CardTitle, CardHeader, CardContent } from "./card"
export default function ListTile({
  title,
  items,
}: {
  title: string
  items: any[]
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-foreground/80">{item.name}</span>
              <span className="text-muted-foreground">{item.percent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ring/20">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
