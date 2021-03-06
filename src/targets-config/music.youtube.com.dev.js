'use strict'
import { Log } from '../lib'

const siteUrl = 'music.youtube.com'
const urlModel = 'https://music.youtube.com/playlist?list={LIST_ID}'
const urlConfList = [
  { id: 'PL4fGSI1pDJn5kI81J1fYWK5eZRl1zJ5kM', category: 'top-100-world' },
  { id: 'PLFgquLnL59anX9MlB94jIg69rR6FyzqQP', category: 'trending-20-us' },
  { id: 'PL4fGSI1pDJn69On1f-8NAvX_CYlx7QyZc', category: 'top-100-us' },
  { id: 'PLFgquLnL59an-05S-d-D1md6qdfjC0GOO', category: 'top-tracks-turkey' },
  { id: 'PLFgquLnL59alcyTM2lkWJU34KtfPXQDaX', category: 'top-tracks' },
  { id: 'PLFgquLnL59alkIbVx9idhCZ0oRQGV5C29', category: 'latest' },
]
const targetSelector = '#contents.ytmusic-playlist-shelf-renderer .ytmusic-playlist-shelf-renderer'

const strExist = value => value && value.length > 0

const getConf = () => {
  const urlConf = urlConfList.shift()
  if (!urlConf) {
    return undefined
  }

  const url = urlModel.replace('{LIST_ID}', urlConf.id)
  return {
    url,
    dataMark: {
      siteUrl,
      category: urlConf.category,
    },
    waitForSelector: '#contents',
    createIndexOption: {
      category: 1,
      dateStep: 1,
      sortNum: 1,
      videoId: 1,
    },
  }
}

const parseData = async ($, dataMark = {}) => {
  const resultData = []
  await $(targetSelector).each(function(index) {
    const thumbnail = $(this).find('.yt-img-shadow').attr('src').split('?')[0]
    const data = {
      thumbnail,
      title: $(this).find('.title').text(),
      artist: $(this).find('.secondary-flex-columns yt-formatted-string:first-child').text().replace('\n', ''),
      // time: $(this).find('> :last-child yt-formatted-string').text().replace('\n', ''), // do'nt appear in iPad...
      videoId: thumbnail ? thumbnail.split('/')[4] : '',
      sortNum: index + 1,
    }
    if (thumbnail.indexOf('jpg') > -1 && strExist(data.videoId) && strExist(data.title)) {
      resultData.push({ ...data, ...dataMark })
    } else {
      Log('The invalidated item position: ', index + 1)
    }
  })
  return resultData
}

export {
  getConf,
  parseData,
}
