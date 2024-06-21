import Link from "next/link";
import { UserNav } from "./components/user-nav";
import Covert from "./components/input";


export default function Dashboard() {
    return(
        <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            datatojson.fun
            <div className="ml-auto flex items-center space-x-4">
              <Link href="/dashboard"></Link>
              <Link href="/report"></Link>
              <UserNav />
            </div>
          </div>
        </div>
        <Covert />
        </div>
    )
}