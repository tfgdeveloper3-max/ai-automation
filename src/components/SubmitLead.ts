const LEAD_ENDPOINT = 'https://leads.authorpublishers.us/api/lead/8OD593p40dhBEBh2F7R6dcv0hoTZ6tvu';

export interface LeadPayload {
    name: string;
    email: string;
    phone_number: string;
    message: string;
}

export async function submitLead(payload: LeadPayload): Promise<unknown> {
    const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            name: payload.name.trim(),
            email: payload.email.trim(),
            phone_number: payload.phone_number.trim(),
            message: payload.message.trim(),
        }),
    });

    let data: unknown = null;
    try {
        data = await res.json();
    } catch {

    }

    if (!res.ok) {
        const msg =
            data && typeof data === 'object' && 'message' in data && typeof (data as { message: unknown }).message === 'string'
                ? (data as { message: string }).message
                : `Request failed (${res.status})`;
        throw new Error(msg);
    }

    return data;
}