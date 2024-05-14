import * as React from 'react'
import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

import { api, apiHost, rootNotionPageId } from '@/lib/config'
import { NotionPageInfo } from '@/lib/types'

export const config = {
  runtime: 'experimental-edge',
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

  // const [pressuraRegularFont] = await Promise.all([
  //   pressuraRegular
  // ])

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff'
        }}
      >
        <svg width="82" height="131" viewBox="0 0 164 262" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M146.747 239.667L18.6111 22.3335H104.639L136.333 76.6668L18.6111 239.667V22.3335" stroke="#fff" strokeWidth="19.0167" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: '"Pressura", sans-serif',
          margin: '0 2rem',
        }}>
          <h1 style={{
            fontSize: 60,
            margin: 0
          }}>
            RDFN
          </h1>
          <p style={{
            fontSize: 40,
            margin: 0
          }}>
            {pageInfo.title}
          </p>
        </div>
      </div>
    )
  )
}
