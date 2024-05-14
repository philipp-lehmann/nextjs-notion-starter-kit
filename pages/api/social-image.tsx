import * as React from 'react'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

export default function () {
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
        }}
      >
        <svg width="164" height="262" viewBox="0 0 164 262" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M146.747 239.667L18.6111 22.3335H104.639L136.333 76.6668L18.6111 239.667V22.3335" stroke="black" strokeWidth="19.0167" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  )
}