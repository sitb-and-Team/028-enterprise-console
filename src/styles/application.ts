/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao
 * data: 2018/6/7
 */

export default {
  container: {
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0
  },
  headerMode: {
    background: '#fff'
  },
  isHeaderCut: {
    padding: '0 24',
    marginLeft: 15,
  },
  isHeaderCutMode: {
    fontSize: 18,
    cursor: 'pointer',
    transition: 'color .3s'
  },
  headerAgency: {
    display: 'inline-block',
    maxWidth: 200,
    marginRight: 5
  },
  content: {
    margin: '30px 16px 0',
    minHeight: 280,
    height: '100%'
  },
  contentMode: {
    backgroundColor: '#fff'
  },
  menuLogo: {
    height: 32,
    lineHeight: '32px',
    margin: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  menuLogoMode: {
    backgroundColor: 'rgba(255,255,255,.2)',
    color: '#fff'
  }
}
