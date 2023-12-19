// import { useState, useEffect } from 'react'
// import { useWeb3React } from '@web3-react/core'
// import styled from 'styled-components'
import { useEffect } from 'react';
import { useEagerConnect, useInactiveListener } from '../../hooks/web3'

// const MessageWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 20rem;
// `

// const Message = styled.h2`
//   color: ${({ theme }) => theme.secondary1};
// `

export default function Web3ReactManager({
  children,
}: {
  children: JSX.Element
}) {
  // const { active } = useWeb3React()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  let activatedWallet;

  useEffect(()=> {
    activatedWallet=localStorage.getItem('wallet')
  },[])
  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager && !!activatedWallet)

  // // handle delayed loader state
  // const [showLoader, setShowLoader] = useState(false)
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowLoader(true)
  //   }, 600)

  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // // if neither context is active, spin
  // if (!active) {
  //   return showLoader ? (
  //     <MessageWrapper>
  //       <Message>Loading</Message>
  //     </MessageWrapper>
  //   ) : null
  // }

  return children
}
