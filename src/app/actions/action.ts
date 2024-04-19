'use server';
import { IResponse } from "@/utils/interface";

export async function GetRuntimeAI(q: string): Promise<IResponse<any>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BE_BASE_URL}?q=${q}`, {
        next: {
            revalidate: 846000 * 30,
        },
    });
    const data = await res.json();
    return data;
}
