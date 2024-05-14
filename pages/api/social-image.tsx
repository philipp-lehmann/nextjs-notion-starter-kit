import * as React from 'react'
import { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'

import { api, apiHost, rootNotionPageId } from '@/lib/config'
import { NotionPageInfo } from '@/lib/types'

const pressuraRegularFontP = fetch(
  new URL('../../fonts/GT-Pressura-Light.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const pressuraBoldFontP = fetch(
  new URL('../../fonts/GT-Pressura-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export const config = {
  runtime: 'experimental-edge'
}

export default async function OGImage(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pageId = searchParams.get('id') || rootNotionPageId
  if (!pageId) {
    return new Response('Invalid notion page id', { status: 400 })
  }

  const pageInfoRes = await fetch(`${apiHost}${api.getNotionPageInfo}`, {
    method: 'POST',
    body: JSON.stringify({ pageId }),
    headers: {
      'content-type': 'application/json'
    }
  })
  if (!pageInfoRes.ok) {
    return new Response(pageInfoRes.statusText, { status: pageInfoRes.status })
  }
  const pageInfo: NotionPageInfo = await pageInfoRes.json()
  console.log(pageInfo)

  const [pressuraRegularFont, pressuraBoldFont] = await Promise.all([
    pressuraRegularFontP,
    pressuraBoldFontP
  ])

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontSize: 32,
          fontWeight: 700,
          fontFamily: '"GTPressura", sans-serif',
        }}
      >
        <svg width="69" height="111" viewBox="0 0 23 37" fill="black" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0038 0H2.3148L2.29013 0.00020589C1.78168 0.00870424 1.36195 0.279513 1.10768 0.668882C1.03611 0.77784 0.977328 0.896945 0.933635 1.02375C0.865224 1.22045 0.8334 1.43239 0.8448 1.64715V34.957C0.8448 36.4625 2.65837 37.0931 3.49928 35.8801L12.5964 22.7568L19.9543 35.7589C20.372 36.497 21.2749 36.7364 21.9711 36.2935C22.6673 35.8506 22.893 34.8933 22.4753 34.1551L14.4841 20.0337L20.8632 10.8312C21.2126 10.3272 21.244 9.65049 20.9428 9.11259L16.2679 0.762981C16.0031 0.289967 15.5227 0 15.0038 0ZM17.9179 9.81656L14.167 3.11719H4.9111L12.8442 17.1358L17.9179 9.81656ZM3.7848 7.18561V30.2047L10.9565 19.8589L3.7848 7.18561Z" fill="#F7F7F7" />
        </svg>

        <div style={{ marginTop: 40 }}>RDFN</div>
        <div style={{ fontSize: 70, fontWeight: 400 }}>
          {pageInfo.title}
        </div>
      </div>

    )
  ),
  {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'GTPressura',
        data: pressuraRegularFont,
        style: 'normal',
        weight: 400
      },
      {
        name: 'GTPressura',
        data: pressuraBoldFont,
        style: 'normal',
        weight: 700
      }
    ]
  }
}


