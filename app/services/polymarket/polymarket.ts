import { type Event, type EventsResponse } from "./polymarket.types"

export function getListMarkets(params: { limit: number, locale: string, tag_slug: string }): Promise<Event[]> {
    return fetch(`https://gamma-api.polymarket.com/events/keyset?closed=false&limit=${params.limit}&locale=${params.locale}&order=volume&ascending=false&tag_slug=${params.tag_slug}`)
        .then((res) => res.json() as Promise<EventsResponse>)
        .then((data) => data.events)
}
