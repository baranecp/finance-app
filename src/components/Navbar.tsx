"use client"
import Image from "next/image"

export default function Navbar() {
    return (
        <section className="container bg-grey-900 fixed bottom-0 left-0 rounded-t-lg">
            <nav>
                <ul className="flex justify-between px-4 py-2 ">
                    <li className="px-6 py-2 hover:bg-beige-100">
                   <Image src="/overview.svg" alt="overview icon" width={24} height={24} />
                    </li>
                    <li className="px-6 py-2">
                   <Image src="/transactions.svg" alt="transactions icon" width={24} height={24}/>
                    </li>
                    <li className="px-6 py-2 self-center">
                   <Image src="/budgets.svg" alt="budgets icon" width={24} height={24}/>
                    </li>
                    <li className="px-6 py-2">
                   <Image src="/pots.svg" alt="pots icon" width={24} height={24}/>
                    </li>
                    <li className="px-6 py-2 self-center">
                   <Image src="/bills.svg" alt="bills icon" width={24} height={24}/>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
