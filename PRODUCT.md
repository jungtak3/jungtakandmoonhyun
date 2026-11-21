# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS in a single repository, deployed by GitHub Pages at `jungtakandmoonhyun.com` (no build step, no framework). Keep it that way: the site must stay deliverable as plain files on a static host.

## Users

Wedding guests of Jung Tak Joo and Moon Hyun Chang, almost all arriving from a KakaoTalk message on a phone, with a minority of English-speaking guests using the English page. They open the link in the minutes after receiving it, standing or moving, one-handed, often mid-conversation. Many are older relatives unfamiliar with the couple's digital life; some will scan a printed QR code.

Their job: confirm the date and place, believe it is the right wedding, feel invited, and know exactly how to get there. A minority need to reply with attendance, send a gift, or find parking.

## Product Purpose

One page that replaces the paper invitation for everyone who was not handed paper: it announces the marriage, carries the couple's voice, and answers every logistical question a guest asks before the day. Success is a guest arriving on time at the right place, having felt personally invited, without messaging the couple to ask where or when.

## Positioning

The invitation is the artifact, not a page about an event. It is authored by the couple in their own voice, shares a domain that belongs only to the two of them, and treats the guest's phone as the wedding's first room — so the page's craft, not its feature list, is what a guest remembers.

## Operating Context

- Delivered as a link in KakaoTalk; the KakaoTalk in-app browser is the primary rendering environment, not mobile Safari or Chrome.
- The printed QR code (`assets/qr_heart.png`, 2048×2048, decodes to `https://jungtakandmoonhyun.com`) points back to this page.
- Ceremony date and time: **2027-03-01 (Monday), 12:30** — confirmed by the couple and printed on the page.
- Venue: Masion de Anaha (메종 드 아나하), 서울특별시 강남구 언주로 517 B1 (신라스테이 역삼), 02-554-6000 — confirmed by the couple, address and phone verified against the venue's own site.
- Access facts from the venue: 선릉역 6번 출구 with a shuttle every 10 minutes; buses 141/242/361/6411 at KT강남지사; parking 신라스테이 B2–B5, 2 hours free, expected to be congested.
- Walking route measured with OSRM: **811m, ~11 min** via 선릉로93길 → 언주로98길 → 언주로. The venue's own site says 13 min, which assumes a slower pace; the page prints 11분 · 811m.
- The map is a Google Maps place embed (keyless `output=embed`), with 도보/차량 길찾기 links that carry no origin, so Google starts from the guest's own location.
- The site is `noindex,nofollow` and stays that way; it is shared by link only.

## Capabilities and Constraints

Confirmed for the real invitation (requested by the couple):

- Ceremony date, time, and venue with directions. **Built.**
- Transport and parking detail. **Built.**
- Google Map embed with 도보/차량 길찾기. **Built.**
- KakaoTalk share and link copy. **Built.**
- RSVP (attendance reply) — requested, **not built**: needs a receiving phone number, KakaoTalk channel, or Google Form URL. The couple answered "kakao"; only the link is missing.
- Gift account details with copy-to-clipboard — requested, **not built**: needs real bank, account number, and holder.
- Photo gallery — requested, **not built**: no photographs exist yet.
- 혼주 (parents' names). **Built**: 주현찬 · 박성남의 아들 주정탁, 장종성 · 정은영의 딸 장문현.

Constraints:

- No server and no build step: anything interactive must run client-side or use a third-party endpoint the couple operates.
- No backend exists and none will be added. RSVP is a handoff: the guest's own messaging app or a third-party form the couple operates. Never a localStorage write, and never a button that claims to have sent something.
- Guest names, photos, personal accounts, and phone numbers are real personal data; nothing may be fabricated to fill a layout.
- Korean is the primary language; the page carries no English prose. The couple's names appear as **주정탁** and **장문현**, and the closing mark is **JT ♥ MH**.

## Brand Commitments

- Names: 주정탁 and 장문현. The page and the closing signature use the monogram **`JT ♥ MH`**; romanisation (Jung Tak Joo / Moon Hyun Chang) is secondary and appears only where Latin is required, not on the page.
- Palette in use: cream ground `#fdfaf6`, plum `#3a2630`, body `#5c4a53`, muted `#6b5a62`, rose `#8f5d6a` (AA-safe; the earlier `#b07c88` failed at 3.3:1).
- Type in use: **LINE Seed Sans KR** (Regular 400 / Bold 700), self-hosted as a woff2 subset.
- The heart-shaped QR is a real, working asset and is part of the identity; the couple asked for it in the first place. It is **not referenced by the current page** — it exists for print.
- Voice: quiet, warm, first-person plural. Korean honorific register toward guests. No exclamation-mark hype, no marketing tone.

## Evidence on Hand

- `assets/qr_heart.png` — 2048×2048 heart-shaped QR, verified to decode to the site URL.
- Parents: 주현찬 · 박성남 (groom's), 장종성 · 정은영 (bride's).
- Venue facts verified against the venue's own site (maisondeanaha.co.kr) on 2026-11-20.
- Absent and not to be invented: photographs of the couple, guest names, bank account numbers, the RSVP destination, the couple's personal contact details, the officiant, and the exact ceremony hall within the venue.
- Reference research: `REFERENCE-KR.md` — 600+ catalog listings reviewed, 8 invitation pages read in full.

## Product Principles

1. Answer the logistics question before the guest has to ask it: date, place, and how to arrive are never more than one scroll away.
2. One page, read top to bottom, on a phone, in under a minute — the invitation is not a website to explore.
3. The couple's voice carries the page; decoration supports it and never speaks louder.
4. Any personal datum shown must be real and supplied by the couple, never authored to fill a slot.
5. It must load and read correctly inside the KakaoTalk in-app browser on a mid-range Android phone over mobile data.

## Accessibility & Inclusion

Guests include older relatives. Text must hold WCAG AA contrast at the sizes it is set; the ceremony details must remain legible without zooming; tap targets must be comfortably tappable; and the page must not depend on motion, hover, or JavaScript to reveal essential information.
