"use client"
import { useState } from "react"
import navs from "@/lib/json/navs.json"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import { Button } from "@base-ui/react"
export default function MobileMenuDrawer() {
  const [isToggle, setIsToggle] = useState(false)

  return (
    <div>
      {isToggle ? (
        <Button
          className={"hover-utility hover:cursor-pointer hover:text-primary"}
          onClick={() => setIsToggle(!isToggle)}
        >
          <XIcon className="text-3xl" />
        </Button>
      ) : (
        <Button
          className={"hover-utility hover:cursor-pointer hover:text-primary"}
          onClick={() => setIsToggle(!isToggle)}
        >
          <ListIcon className="text-3xl" />
        </Button>
      )}
    </div>
  )
}
