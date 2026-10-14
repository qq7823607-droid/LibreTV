export const runtime = 'nodejs';

const MOVIES = [{
  vod_id: 'bbb-test',
  vod_name: '大雄兔 Big Buck Bunny 开放影片播放测试',
  type_id: '1',
  type_name: '开放影片测试',
  vod_year: '2008',
  vod_area: '荷兰',
  vod_lang: '无对白',
  vod_pic: '',
  vod_remarks: '最高1080p，非4K',
  vod_content: 'Blender开放影片，Mux公开HLS测试流，用于测试搜索和播放。',
  vod_play_from: '公开HLS测试',
  vod_play_url:
    '播放测试$https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
}];

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const ids = params.get('ids');
  const keyword = (params.get('wd') || '').trim().toLowerCase();

  let list = MOVIES;

  if (ids) {
    list = list.filter(v => ids.split(',').includes(v.vod_id));
  } else if (keyword && keyword !== 'test') {
    list = list.filter(v =>
      (v.vod_name + ' ' + v.vod_content)
        .toLowerCase()
        .includes(keyword)
    );
  }

  return Response.json({
    code: 1,
    msg: 'success',
    page: 1,
    pagecount: 1,
    limit: 20,
    total: list.length,
    class: [{ type_id: 1, type_name: '开放影片测试' }],
    list
  });
}
