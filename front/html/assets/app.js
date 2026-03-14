(() => {
  const STORAGE_KEY = 'neMusicProto_v1';

  const db = {
    playlists: [
      {
        id: '1',
        name: '学习专注｜LoFi & Chill',
        desc: '不吵不闹，适合写作业/敲代码。',
        tags: ['LoFi', '专注', '轻音乐'],
        playCount: 2356789,
        tracks: ['101', '102', '103', '104', '105']
      },
      {
        id: '2',
        name: '通勤必备｜节奏感拉满',
        desc: '上班路上不要困。',
        tags: ['流行', '节奏', '通勤'],
        playCount: 987654,
        tracks: ['201', '202', '203', '204']
      },
      {
        id: '3',
        name: '夜晚治愈｜情绪收纳箱',
        desc: '把今天的疲惫放一放。',
        tags: ['治愈', '夜晚', '华语'],
        playCount: 543210,
        tracks: ['301', '302', '303', '304']
      },
      {
        id: '4',
        name: '运动燃脂｜跑步节拍',
        desc: '让心率跟上节奏。',
        tags: ['运动', '电子', '燃'],
        playCount: 1200345,
        tracks: ['401', '402', '403', '404']
      }
    ],
    tracks: {
      '101': { id: '101', title: 'Warm Coffee', artist: 'LoFi Room', duration: 214, lyrics: [
        [0, '你在清晨醒来'], [14, '窗外是安静的街'], [28, '一杯温热的咖啡'], [42, '把今天慢慢打开']
      ]},
      '102': { id: '102', title: 'Rainy Keyboard', artist: 'Typing Beats', duration: 189, lyrics: [
        [0, '雨滴敲在窗沿'], [16, '像节拍一样自然'], [32, '把注意力收回来'], [48, '一行一行写完']
      ]},
      '103': { id: '103', title: 'Soft Neon', artist: 'City Glow', duration: 202, lyrics: [
        [0, '霓虹不吵'], [18, '夜色很软'], [36, '你把心事折叠'], [54, '放进耳机里慢慢听']
      ]},
      '104': { id: '104', title: 'Study Mode', artist: 'Focus Lab', duration: 176, lyrics: [
        [0, '把通知静音'], [15, '把世界变小'], [30, '剩下你和目标'], [45, '一步一步就好']
      ]},
      '105': { id: '105', title: 'Late Night Loop', artist: 'Loop Station', duration: 233, lyrics: [
        [0, '深夜的循环'], [20, '不需要答案'], [40, '呼吸在节奏里'], [60, '慢慢安放']
      ]},
      '201': { id: '201', title: 'Run It', artist: 'Pulse', duration: 198, lyrics: [
        [0, '跟上节拍'], [18, '别停下来'], [36, '一步一步'], [54, '把困意甩开']
      ]},
      '202': { id: '202', title: 'City Sprint', artist: 'Neon Runner', duration: 210, lyrics: [
        [0, '穿过人海'], [17, '穿过时间'], [34, '你比昨天更快一点'], [51, '再快一点']
      ]},
      '203': { id: '203', title: 'Get High', artist: 'Weekend', duration: 173, lyrics: [
        [0, '把烦恼放低'], [16, '把音量调高'], [32, '就现在'], [48, '跟着跳']
      ]},
      '204': { id: '204', title: 'Morning Drive', artist: 'Radio Pop', duration: 225, lyrics: [
        [0, '早高峰的风'], [20, '吹散睡意'], [40, '你握紧方向盘'], [60, '也握紧自己']
      ]},
      '301': { id: '301', title: '慢一点', artist: '小岛', duration: 232, lyrics: [
        [0, '慢一点也没关系'], [22, '你已经很努力'], [44, '把心事交给夜'], [66, '明天会更轻']
      ]},
      '302': { id: '302', title: '听海', artist: '晚风', duration: 205, lyrics: [
        [0, '潮声把烦恼带走'], [18, '你不用开口'], [36, '海会听懂'], [54, '也会保守']
      ]},
      '303': { id: '303', title: '微光', artist: '纸飞机', duration: 196, lyrics: [
        [0, '留一点微光'], [18, '给不安的你'], [36, '路会自己出现'], [54, '别着急']
      ]},
      '304': { id: '304', title: '入眠', artist: '云朵', duration: 221, lyrics: [
        [0, '把眼睛闭上'], [20, '把肩膀放松'], [40, '今晚你会做个好梦'], [60, '好梦']
      ]},
      '401': { id: '401', title: '燃', artist: 'Kinetic', duration: 188, lyrics: [
        [0, '点火'], [16, '起跑'], [32, '心跳'], [48, '燃烧']
      ]},
      '402': { id: '402', title: 'Faster', artist: 'Kinetic', duration: 199, lyrics: [
        [0, '更快一点'], [18, '再快一点'], [36, '别回头'], [54, '向前']
      ]},
      '403': { id: '403', title: 'No Pain', artist: 'Gym Mode', duration: 207, lyrics: [
        [0, '汗水是答案'], [20, '坚持就会看到'], [40, '你想要的自己'], [60, '正在来到']
      ]},
      '404': { id: '404', title: 'Last Lap', artist: 'Gym Mode', duration: 215, lyrics: [
        [0, '最后一圈'], [18, '别停'], [36, '你能行'], [54, '冲线']
      ]}
    }
  };

  const USER_KEY = 'neMusicProto_user_v1';
  const SETTINGS_KEY = 'neMusicProto_settings_v1';
  const ACCOUNTS_KEY = 'neMusicProto_accounts_v1';

  function guestUser() {
    return { loggedIn: false, name: '访客', avatarDataUrl: null, signature: '', email: '', address: '', gender: '' };
  }

  function getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return guestUser();
      const u = JSON.parse(raw);
      const inferredLoggedIn = (u?.loggedIn === undefined || u?.loggedIn === null)
        ? (!!(u?.email && String(u.email).trim()) || ((u?.name && String(u.name).trim()) ? String(u.name).trim() : '访客') !== '访客')
        : !!u?.loggedIn;
      const normalized = {
        loggedIn: inferredLoggedIn,
        name: (u?.name && String(u.name).trim()) ? String(u.name).trim() : '访客',
        avatarDataUrl: (u?.avatarDataUrl && String(u.avatarDataUrl).startsWith('data:image/')) ? String(u.avatarDataUrl) : null,
        signature: (u?.signature && String(u.signature).trim()) ? String(u.signature).trim() : '',
        email: (u?.email && String(u.email).trim()) ? String(u.email).trim() : '',
        address: (u?.address && String(u.address).trim()) ? String(u.address).trim() : '',
        gender: (u?.gender && String(u.gender).trim()) ? String(u.gender).trim() : ''
      };
      if (!normalized.loggedIn) return guestUser();
      return normalized;
    } catch {
      return guestUser();
    }
  }

  function setUser(next) {
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('proto:user'));
  }

  function getAccounts() {
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      if (!raw) return [];
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list.filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  function setAccounts(next) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next));
  }

  function accountKeyOf(u) {
    const email = (u.email || '').trim().toLowerCase();
    if (email) return `email:${email}`;
    const name = (u.name || '').trim();
    return `name:${name || '用户'}`;
  }

  function upsertAccountFromUser(u) {
    const key = accountKeyOf(u);
    const accounts = getAccounts();
    const next = accounts.filter((a) => a && a.key !== key);
    next.unshift({
      key,
      name: u.name || '用户',
      email: u.email || '',
      avatarDataUrl: u.avatarDataUrl || null,
      signature: u.signature || '',
      gender: u.gender || '',
      address: u.address || ''
    });
    setAccounts(next.slice(0, 8));
  }

  function ensureCurrentAccountStored() {
    const u = getUser();
    if (!u.loggedIn) return;
    const key = accountKeyOf(u);
    const accounts = getAccounts();
    if (accounts.some((a) => a && a.key === key)) return;
    upsertAccountFromUser(u);
  }

  function getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) {
        return {
          autoplay: true,
          wifiOnly: false,
          crossfadeSec: 0,
          explicitFilter: false,
          language: 'zh',
          uiScale: 'md'
        };
      }
      const s = JSON.parse(raw);
      return {
        autoplay: !!s.autoplay,
        wifiOnly: !!s.wifiOnly,
        crossfadeSec: Number.isFinite(s.crossfadeSec) ? Math.max(0, Math.min(12, s.crossfadeSec)) : 0,
        explicitFilter: !!s.explicitFilter,
        language: s.language === 'en' ? 'en' : 'zh',
        uiScale: (s.uiScale === 'sm' || s.uiScale === 'lg') ? s.uiScale : 'md'
      };
    } catch {
      return { autoplay: true, wifiOnly: false, crossfadeSec: 0, explicitFilter: false, language: 'zh', uiScale: 'md' };
    }
  }

  function setSettings(next) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('proto:settings'));
  }

  function getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { currentTrackId: null, isPlaying: false, progressSec: 0, queue: [], recent: [], likedTrackIds: [], likedPlaylistIds: [] };
      const s = JSON.parse(raw);
      return {
        currentTrackId: s.currentTrackId ?? null,
        isPlaying: !!s.isPlaying,
        progressSec: Number.isFinite(s.progressSec) ? s.progressSec : 0,
        queue: Array.isArray(s.queue) ? s.queue : [],
        recent: Array.isArray(s.recent) ? s.recent : [],
        likedTrackIds: Array.isArray(s.likedTrackIds) ? s.likedTrackIds : [],
        likedPlaylistIds: Array.isArray(s.likedPlaylistIds) ? s.likedPlaylistIds : []
      };
    } catch {
      return { currentTrackId: null, isPlaying: false, progressSec: 0, queue: [], recent: [], likedTrackIds: [], likedPlaylistIds: [] };
    }
  }

  function setState(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('proto:state'));
  }

  function qs(name) {
    const u = new URL(location.href);
    return u.searchParams.get(name);
  }

  function fmtCount(n) {
    if (n >= 100000000) return (n / 100000000).toFixed(1).replace(/\\.0$/, '') + '亿';
    if (n >= 10000) return (n / 10000).toFixed(1).replace(/\\.0$/, '') + '万';
    return String(n);
  }

  function fmtTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = String(s % 60).padStart(2, '0');
    return `${m}:${r}`;
  }

  function escapeHtml(input) {
    const s = String(input);
    let out = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === '&') out += '&amp;';
      else if (c === '<') out += '&lt;';
      else if (c === '>') out += '&gt;';
      else if (c === '"') out += '&quot;';
      else if (c === "'") out += '&#39;';
      else out += c;
    }
    return out;
  }

  function getInitial(name) {
    const n = String(name || '').trim();
    if (!n) return 'U';
    const first = Array.from(n)[0];
    return (first || 'U').toUpperCase();
  }

  function renderAvatarInto(el) {
    const u = getUser();
    if (!u.loggedIn) {
      const curLabel = el.getAttribute('aria-label');
      if (!curLabel || /^用户：/.test(curLabel) || curLabel === '登录') el.setAttribute('aria-label', '登录');
      el.innerHTML = '';
      el.textContent = '登录';
      return;
    }

    const curLabel = el.getAttribute('aria-label');
    if (!curLabel || /^用户：/.test(curLabel)) el.setAttribute('aria-label', `用户：${u.name}`);
    if (u.avatarDataUrl) el.innerHTML = `<img alt="" src="${u.avatarDataUrl}">`;
    else {
      el.innerHTML = '';
      el.textContent = getInitial(u.name);
    }
  }

  function mountUserAvatars() {
    const u = getUser();
    document.querySelectorAll('[data-user-avatar]').forEach((el) => {
      renderAvatarInto(el);
      const a = el.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!/profile\.html(?:$|\?)/.test(href) && href !== './profile.html') return;
      if (u.loggedIn) return;
      a.setAttribute('href', './login.html');
      if (!a.getAttribute('aria-label')) a.setAttribute('aria-label', '去登录');
    });
  }

  function mountDrawerName() {
    const el = document.querySelector('[data-el="drawer-name"]');
    if (!el) return;
    el.textContent = getUser().name || '访客';
  }

  function mountMenuHeader() {
    const avatarLink = document.querySelector('[data-el="menu-avatar"]');
    const u = getUser();

    if (avatarLink) {
      if (u.loggedIn) {
        avatarLink.setAttribute('href', './profile.html');
      } else {
        avatarLink.setAttribute('href', './login.html');
        avatarLink.setAttribute('aria-label', '去登录');
      }
      avatarLink.setAttribute('data-user-avatar', '');
      renderAvatarInto(avatarLink);
    }

    const foot = document.querySelector('.drawer-foot');
    if (foot) foot.style.display = u.loggedIn ? '' : 'none';

    document.querySelectorAll('[data-action="logout"]').forEach((btn) => {
      btn.style.display = u.loggedIn ? '' : 'none';
    });
  }

  function applyUiScale() {
    const s = getSettings();
    document.documentElement.setAttribute('data-ui', s.uiScale || 'md');
  }

  function bumpRecent(recent, trackId) {
    const now = Date.now();
    const list = Array.isArray(recent) ? recent.slice() : [];
    const filtered = list.filter((x) => x && x.trackId !== trackId);
    filtered.unshift({ trackId, ts: now });
    return filtered.slice(0, 30);
  }

  function isLiked(state, trackId) {
    return !!trackId && Array.isArray(state.likedTrackIds) && state.likedTrackIds.includes(trackId);
  }

  function toggleLiked(trackId) {
    const state = getState();
    if (!trackId) return;
    const set = new Set(Array.isArray(state.likedTrackIds) ? state.likedTrackIds : []);
    if (set.has(trackId)) set.delete(trackId);
    else set.add(trackId);
    setState({ ...state, likedTrackIds: Array.from(set) });
  }

  function isPlaylistLiked(state, playlistId) {
    return !!playlistId && Array.isArray(state.likedPlaylistIds) && state.likedPlaylistIds.includes(playlistId);
  }

  function toggleLikedPlaylist(playlistId) {
    const state = getState();
    if (!playlistId) return;
    const set = new Set(Array.isArray(state.likedPlaylistIds) ? state.likedPlaylistIds : []);
    if (set.has(playlistId)) set.delete(playlistId);
    else set.add(playlistId);
    setState({ ...state, likedPlaylistIds: Array.from(set) });
  }

  function iconPlay() {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l12-7L8 5z"/></svg>`;
  }
  function iconPause() {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>`;
  }
  function iconHeart() {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.4-9.4-8.5C.7 9.2 2.7 6 6.2 6c2 0 3.2 1 3.8 1.8C10.6 7 11.8 6 13.8 6c3.5 0 5.5 3.2 3.6 6.5C19 16.6 12 21 12 21zm0-2.3c1.8-1.2 6-4.2 7.8-7.2c1.2-2-.2-3.5-2-3.5c-1.6 0-2.5.9-3.1 1.7l-1.7 2l-1.7-2C10.7 8.9 9.8 8 8.2 8c-1.8 0-3.2 1.5-2 3.5c1.8 3 6 6 7.8 7.2z"/></svg>`;
  }
  function iconHeartFill() {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.4-9.4-8.5C.7 9.2 2.7 6 6.2 6c2 0 3.2 1 3.8 1.8C10.6 7 11.8 6 13.8 6c3.5 0 5.5 3.2 3.6 6.5C19 16.6 12 21 12 21z"/></svg>`;
  }

  function setLikeBtnVisual(btn, liked) {
    if (!btn) return;
    btn.classList.toggle('liked', !!liked);
    btn.innerHTML = liked ? iconHeartFill() : iconHeart();
    btn.setAttribute('aria-label', liked ? '已喜欢' : '喜欢');
  }

  function playTrack(trackId, queue) {
    const state = getState();
    const nextQueue = queue?.length ? queue.slice() : (state.queue?.length ? state.queue : [trackId]);
    setState({
      ...state,
      currentTrackId: trackId,
      queue: nextQueue,
      isPlaying: true,
      progressSec: 0,
      recent: bumpRecent(state.recent, trackId)
    });
  }

  function togglePlay() {
    const state = getState();
    if (!state.currentTrackId) return;
    setState({ ...state, isPlaying: !state.isPlaying });
  }

  function nextTrack(dir) {
    const state = getState();
    if (!state.queue?.length) return;
    const idx = Math.max(0, state.queue.indexOf(state.currentTrackId));
    const nextIdx = (idx + dir + state.queue.length) % state.queue.length;
    const nextId = state.queue[nextIdx];
    setState({
      ...state,
      currentTrackId: nextId,
      isPlaying: true,
      progressSec: 0,
      recent: bumpRecent(state.recent, nextId)
    });
  }

  function tickProgress() {
    const state = getState();
    if (!state.isPlaying || !state.currentTrackId) return;
    const t = db.tracks[state.currentTrackId];
    if (!t) return;
    const next = Math.min(t.duration, (state.progressSec ?? 0) + 1);
    if (next >= t.duration) {
      nextTrack(1);
      return;
    }
    setState({ ...state, progressSec: next });
  }

  function mountTabbar() {
    const host = document.querySelector('[data-mount="tabbar"]');
    if (!host) return;
    const page = document.body.dataset.page || '';
    host.innerHTML = `
      <div class="tabbar">
        <div class="tabbar-inner">
          <a class="tab ${page === 'discover' ? 'active' : ''}" href="./index.html" aria-label="发现">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 3l9 7v11a2 2 0 0 1-2 2h-5v-7H10v7H5a2 2 0 0 1-2-2V10l9-7z"/></svg>
            <div class="label">发现</div>
          </a>
          <a class="tab ${page === 'liked' ? 'active' : ''}" href="./liked.html" aria-label="我喜欢的音乐">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.4-8.5C.7 9.2 2.7 6 6.2 6c2 0 3.2 1 3.8 1.8C10.6 7 11.8 6 13.8 6c3.5 0 5.5 3.2 3.6 6.5C19 16.6 12 21 12 21z"/></svg>
            <div class="label">喜欢</div>
          </a>
          <a class="tab ${page === 'profile' ? 'active' : ''}" href="./profile.html" aria-label="我的">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z"/></svg>
            <div class="label">我的</div>
          </a>
        </div>
      </div>
    `;
  }

  function mountMiniPlayer() {
    const host = document.querySelector('[data-mount="miniplayer"]');
    if (!host) return;

    const state = getState();
    if (!state.currentTrackId) {
      host.innerHTML = '';
      return;
    }
    const t = db.tracks[state.currentTrackId];
    if (!t) {
      host.innerHTML = '';
      return;
    }
    const pct = Math.max(0, Math.min(100, (state.progressSec / t.duration) * 100));
    host.innerHTML = `
      <div class="miniplayer" role="button" aria-label="迷你播放器">
        <div class="miniplayer-inner" data-action="open-player">
          <div class="cover" aria-hidden="true"></div>
          <div class="info">
            <div class="t">${escapeHtml(t.title)}</div>
            <div class="s">${escapeHtml(t.artist)}</div>
          </div>
          <button class="btn" data-action="toggle-play" aria-label="${state.isPlaying ? '暂停' : '播放'}">
            ${state.isPlaying ? iconPause() : iconPlay()}
          </button>
        </div>
        <div class="bar"><div style="width:${pct}%"></div></div>
      </div>
    `;

    host.querySelector('[data-action="toggle-play"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
    host.querySelector('[data-action="open-player"]')?.addEventListener('click', () => {
      location.href = './player.html';
    });
  }

  function renderDiscover() {
    const playlists = db.playlists.slice(0, 4);
    const playlistGrid = document.querySelector('[data-el="playlist-grid"]');
    if (playlistGrid) {
      playlistGrid.innerHTML = playlists.map(p => `
        <a class="card" href="./playlist.html?id=${encodeURIComponent(p.id)}">
          <div class="thumb">
            <div class="badge">${fmtCount(p.playCount)} 次播放</div>
          </div>
          <div class="body">
            <div class="name">${escapeHtml(p.name)}</div>
            <div class="sub">${escapeHtml(p.desc)}</div>
          </div>
        </a>
      `).join('');
    }

    const pick = playlists[0];
    const recList = document.querySelector('[data-el="rec-tracks"]');
    if (recList && pick) {
      const state = getState();
      const tracks = pick.tracks.map(id => db.tracks[id]).filter(Boolean);
      recList.innerHTML = tracks.map((t, i) => `
        <div class="row" data-track-id="${t.id}">
          <div class="idx">${i + 1}</div>
          <div class="meta">
            <div class="t">${escapeHtml(t.title)}</div>
            <div class="s">${escapeHtml(t.artist)} · ${fmtTime(t.duration)}</div>
          </div>
          <div class="acts">
            <button class="act like-btn ${isLiked(state, t.id) ? 'liked' : ''}" data-action="like" aria-label="喜欢">
              ${isLiked(state, t.id) ? iconHeartFill() : iconHeart()}
            </button>
            <button class="act" data-action="play" aria-label="播放">${iconPlay()}</button>
          </div>
        </div>
      `).join('');
      recList.querySelectorAll('.row').forEach(row => {
        row.addEventListener('click', () => {
          const trackId = row.getAttribute('data-track-id');
          if (!trackId) return;
          playTrack(trackId, tracks.map(x => x.id));
          location.href = './player.html';
        });
      });
      recList.querySelectorAll('[data-action="like"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const row = btn.closest('[data-track-id]');
          const trackId = row?.getAttribute('data-track-id');
          if (!trackId) return;
          toggleLiked(trackId);
          const next = getState();
          setLikeBtnVisual(btn, isLiked(next, trackId));
        });
      });
    }
  }

  function renderSearch() {
    const hot = ['周杰伦', '华语治愈', 'LoFi', '跑步歌单', '粤语经典', '情歌'];
    const hotWrap = document.querySelector('[data-el="hot"]');
    if (hotWrap) {
      hotWrap.innerHTML = hot.map(t => `<button class="chip" data-hot="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('');
    }

    const input = document.querySelector('[data-el="q"]');
    const results = document.querySelector('[data-el="results"]');

    function doSearch(q) {
      if (!results) return;
      const state = getState();
      const query = (q || '').trim().toLowerCase();
      if (!query) {
        results.innerHTML = `<div class="muted" style="padding:12px;">输入关键词后显示结果（歌曲/歌单）</div>`;
        return;
      }
      const trackHits = Object.values(db.tracks).filter(t =>
        t.title.toLowerCase().includes(query) || t.artist.toLowerCase().includes(query)
      ).slice(0, 6);
      const playlistHits = db.playlists.filter(p => p.name.toLowerCase().includes(query)).slice(0, 4);

      const parts = [];
      if (trackHits.length) {
        parts.push(`<div class="section-title" style="padding:12px 12px 0;"><h3>单曲</h3><div class="more">共 ${trackHits.length} 条</div></div>`);
        parts.push(`<div class="list">` + trackHits.map((t, i) => `
          <div class="row" data-track-id="${t.id}">
            <div class="idx">${i + 1}</div>
            <div class="meta">
              <div class="t">${escapeHtml(t.title)}</div>
              <div class="s">${escapeHtml(t.artist)} · ${fmtTime(t.duration)}</div>
            </div>
            <div class="acts">
              <button class="act like-btn ${isLiked(state, t.id) ? 'liked' : ''}" data-action="like" aria-label="喜欢">
                ${isLiked(state, t.id) ? iconHeartFill() : iconHeart()}
              </button>
              <button class="act" data-action="play" aria-label="播放">${iconPlay()}</button>
            </div>
          </div>
        `).join('') + `</div>`);
      }
      if (playlistHits.length) {
        parts.push(`<div class="section-title" style="padding:16px 12px 0;"><h3>歌单</h3><div class="more">共 ${playlistHits.length} 条</div></div>`);
        parts.push(`<div class="grid" style="padding: 0 12px 12px;">` + playlistHits.map(p => `
          <a class="card" href="./playlist.html?id=${encodeURIComponent(p.id)}">
            <div class="thumb"><div class="badge">${fmtCount(p.playCount)} 次播放</div></div>
            <div class="body">
              <div class="name">${escapeHtml(p.name)}</div>
              <div class="sub">${escapeHtml(p.desc)}</div>
            </div>
          </a>
        `).join('') + `</div>`);
      }
      if (!parts.length) parts.push(`<div class="muted" style="padding:12px;">没有匹配结果</div>`);
      results.innerHTML = parts.join('');

      results.querySelectorAll('[data-track-id]').forEach(el => {
        el.addEventListener('click', () => {
          const trackId = el.getAttribute('data-track-id');
          if (!trackId) return;
          playTrack(trackId, trackHits.map(x => x.id));
          location.href = './player.html';
        });
      });

      results.querySelectorAll('[data-action="like"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const row = btn.closest('[data-track-id]');
          const trackId = row?.getAttribute('data-track-id');
          if (!trackId) return;
          toggleLiked(trackId);
          const next = getState();
          setLikeBtnVisual(btn, isLiked(next, trackId));
        });
      });
    }

    if (input) {
      input.addEventListener('input', () => doSearch(input.value));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch(input.value);
      });
    }
    hotWrap?.querySelectorAll('[data-hot]')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-hot') || '';
        if (input) input.value = q;
        doSearch(q);
      });
    });
    doSearch('');
  }

  function renderPlaylist() {
    const id = qs('id') || '1';
    const p = db.playlists.find(x => x.id === id) || db.playlists[0];
    if (!p) return;

    const stateAtStart = getState();
    const title = document.querySelector('[data-el="pl-title"]');
    const desc = document.querySelector('[data-el="pl-desc"]');
    const tags = document.querySelector('[data-el="pl-tags"]');
    const count = document.querySelector('[data-el="pl-count"]');
    const likePlBtn = document.querySelector('[data-action="toggle-like-playlist"]');
    if (title) title.textContent = p.name;
    if (desc) desc.textContent = p.desc;
    if (count) count.textContent = `${fmtCount(p.playCount)} 次播放`;
    if (tags) tags.innerHTML = p.tags.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
    if (likePlBtn) {
      likePlBtn.textContent = isPlaylistLiked(stateAtStart, p.id) ? '♥' : '♡';
      likePlBtn.style.color = isPlaylistLiked(stateAtStart, p.id) ? 'var(--brand)' : '#111';
    }

    const list = document.querySelector('[data-el="pl-tracks"]');
    const tracks = p.tracks.map(tid => db.tracks[tid]).filter(Boolean);
    if (list) {
      const state = getState();
      list.innerHTML = tracks.map((t, i) => `
        <div class="row" data-track-id="${t.id}">
          <div class="idx">${String(i + 1).padStart(2, '0')}</div>
          <div class="meta">
            <div class="t">${escapeHtml(t.title)}</div>
            <div class="s">${escapeHtml(t.artist)} · ${fmtTime(t.duration)}</div>
          </div>
          <div class="acts">
            <button class="act like-btn ${isLiked(state, t.id) ? 'liked' : ''}" data-action="like" aria-label="喜欢">
              ${isLiked(state, t.id) ? iconHeartFill() : iconHeart()}
            </button>
            <button class="act" data-action="play" aria-label="播放">${iconPlay()}</button>
          </div>
        </div>
      `).join('');
      list.querySelectorAll('.row').forEach(row => {
        row.addEventListener('click', () => {
          const trackId = row.getAttribute('data-track-id');
          if (!trackId) return;
          playTrack(trackId, tracks.map(x => x.id));
          location.href = './player.html';
        });
      });
      list.querySelectorAll('[data-action="like"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const row = btn.closest('[data-track-id]');
          const trackId = row?.getAttribute('data-track-id');
          if (!trackId) return;
          toggleLiked(trackId);
          const next = getState();
          setLikeBtnVisual(btn, isLiked(next, trackId));
        });
      });
    }

    document.querySelector('[data-action="play-all"]')?.addEventListener('click', () => {
      const state = getState();
      const queue = p.tracks.slice();
      const currentTrackId = queue[0] ?? null;
      setState({
        ...state,
        queue,
        currentTrackId,
        isPlaying: true,
        progressSec: 0,
        recent: currentTrackId ? bumpRecent(state.recent, currentTrackId) : state.recent
      });
      location.href = './player.html';
    });

    likePlBtn?.addEventListener('click', () => {
      toggleLikedPlaylist(p.id);
      const next = getState();
      likePlBtn.textContent = isPlaylistLiked(next, p.id) ? '♥' : '♡';
      likePlBtn.style.color = isPlaylistLiked(next, p.id) ? 'var(--brand)' : '#111';
    });
  }

  function renderPlayer() {
    const title = document.querySelector('[data-el="song-title"]');
    const artist = document.querySelector('[data-el="song-artist"]');
    const cur = document.querySelector('[data-el="cur"]');
    const dur = document.querySelector('[data-el="dur"]');
    const bar = document.querySelector('[data-el="bar"]');
    const playBtn = document.querySelector('[data-action="player-play"]');
    const lyric = document.querySelector('[data-el="lyric"]');
    const toggleLyricBtn = document.querySelector('[data-action="toggle-lyric"]');
    const likeBtn = document.querySelector('[data-action="toggle-like"]');
    const discWrap = document.querySelector('[data-el="disc-wrap"]');

    function render() {
      const state = getState();
      const t = state.currentTrackId ? db.tracks[state.currentTrackId] : null;
      if (!t) {
        if (title) title.textContent = '未选择歌曲';
        if (artist) artist.textContent = '请从发现/搜索/歌单进入播放';
        if (cur) cur.textContent = '0:00';
        if (dur) dur.textContent = '0:00';
        if (bar) bar.style.width = '0%';
        if (playBtn) playBtn.innerHTML = iconPlay();
        if (lyric) lyric.innerHTML = `<div class="line active">没有歌词</div>`;
        if (likeBtn) likeBtn.textContent = '♡ 喜欢';
        return;
      }

      if (title) title.textContent = t.title;
      if (artist) artist.textContent = t.artist;
      if (cur) cur.textContent = fmtTime(state.progressSec);
      if (dur) dur.textContent = fmtTime(t.duration);
      if (bar) bar.style.width = `${Math.max(0, Math.min(100, (state.progressSec / t.duration) * 100))}%`;
      if (playBtn) playBtn.innerHTML = state.isPlaying ? iconPause() : iconPlay();
      if (likeBtn) likeBtn.textContent = isLiked(state, t.id) ? '♥ 已喜欢' : '♡ 喜欢';

      if (lyric) {
        const lines = (t.lyrics || []).map(([ts, text]) => ({ ts, text }));
        const now = state.progressSec ?? 0;
        let activeIdx = 0;
        for (let i = 0; i < lines.length; i++) {
          if (now >= lines[i].ts) activeIdx = i;
        }
        lyric.innerHTML = lines.map((l, i) =>
          `<div class="line ${i === activeIdx ? 'active' : ''}">${escapeHtml(l.text)}</div>`
        ).join('');
      }
    }

    document.querySelector('[data-action="player-prev"]')?.addEventListener('click', () => nextTrack(-1));
    document.querySelector('[data-action="player-next"]')?.addEventListener('click', () => nextTrack(1));
    playBtn?.addEventListener('click', () => togglePlay());
    document.querySelector('[data-action="back"]')?.addEventListener('click', () =>
      history.length > 1 ? history.back() : (location.href = './index.html')
    );

    toggleLyricBtn?.addEventListener('click', () => {
      if (!lyric || !discWrap) return;
      const showLyric = lyric.style.display !== 'none';
      lyric.style.display = showLyric ? 'none' : '';
      discWrap.style.display = showLyric ? '' : 'none';
      toggleLyricBtn.textContent = showLyric ? '显示歌词' : '显示封面';
    });

    likeBtn?.addEventListener('click', () => {
      const state = getState();
      if (!state.currentTrackId) return;
      toggleLiked(state.currentTrackId);
    });

    window.addEventListener('proto:state', render);
    render();
  }

  function wireAppMenu() {
    const overlay = document.querySelector('[data-el="app-menu"]');
    const openBtn = document.querySelector('[data-action="open-menu"]');
    if (!overlay || !openBtn) return;

    const close = () => overlay.classList.remove('open');
    const open = () => {
      ensureCurrentAccountStored();
      mountDrawerName();
      mountMenuHeader();
      overlay.classList.add('open');
    };

    openBtn.addEventListener('click', open);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelectorAll('[data-action="close-more"]').forEach((btn) => {
      btn.addEventListener('click', close);
    });
    overlay.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', close);
    });

    overlay.querySelectorAll('[data-action="logout"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const u = getUser();
        if (!u.loggedIn) return;
        upsertAccountFromUser(u);
        setUser({ loggedIn: false, name: '访客', avatarDataUrl: null, signature: '', email: '', address: '', gender: '' });
        close();
        location.href = './index.html';
      });
    });

    function openAccountSheet() {
      const sheet = document.querySelector('[data-el="account-sheet"]');
      const list = document.querySelector('[data-el="account-list"]');
      if (!sheet || !list) return;
      const accounts = getAccounts();
      list.innerHTML = accounts.map((a) => `
        <button class="drawer-item" type="button" data-account-key="${escapeHtml(a.key)}">
          <div class="left">
            <div class="avatar small">${a.avatarDataUrl ? `<img alt=\"\" src=\"${escapeHtml(a.avatarDataUrl)}\">` : escapeHtml(getInitial(a.name || '用户'))}</div>
            <span>${escapeHtml(a.name || '用户')}</span>
          </div>
          <div class="right">${escapeHtml((a.email || '').trim() || '点击切换')}</div>
        </button>
      `).join('');

      list.innerHTML += `
        <button class="drawer-item" type="button" data-action="add-account">
          <div class="left">
            <svg class="icon" viewBox="0 0 24 24"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
            <span>添加账号</span>
          </div>
          <div class="right">去登录</div>
        </button>
      `;

      list.querySelectorAll('[data-account-key]').forEach((b) => {
        b.addEventListener('click', () => {
          const key = b.getAttribute('data-account-key');
          const pick = getAccounts().find((x) => x.key === key);
          if (!pick) return;
          const cur = getUser();
          setUser({
            ...cur,
            loggedIn: true,
            name: pick.name || '用户',
            email: pick.email || '',
            avatarDataUrl: pick.avatarDataUrl || null,
            signature: pick.signature || '',
            gender: pick.gender || '',
            address: pick.address || ''
          });
          sheet.classList.remove('open');
          close();
          location.href = './index.html';
        });
      });
      list.querySelectorAll('[data-action="add-account"]').forEach((b) => {
        b.addEventListener('click', () => {
          sheet.classList.remove('open');
          close();
          location.href = './login.html';
        });
      });

      sheet.classList.add('open');
      if (!sheet.dataset.wired) {
        sheet.dataset.wired = '1';
        sheet.addEventListener('click', (e) => {
          if (e.target === sheet) sheet.classList.remove('open');
        });
        sheet.querySelectorAll('[data-action="close-account-sheet"]').forEach((c) => {
          c.addEventListener('click', () => sheet.classList.remove('open'));
        });
      }
    }

    overlay.querySelectorAll('[data-action="switch-account"]').forEach((btn) => {
      btn.addEventListener('click', () => openAccountSheet());
    });
  }

  function renderRecent() {
    const host = document.querySelector('[data-el="recent-list"]');
    if (!host) return;
    const state = getState();
    const items = Array.isArray(state.recent) ? state.recent : [];
    const tracks = items
      .map((x) => db.tracks[x.trackId])
      .filter(Boolean);

    if (!tracks.length) {
      host.innerHTML = `<div class="muted" style="padding:12px;">暂无最近播放</div>`;
      return;
    }

    host.innerHTML = tracks.map((t, i) => `
      <div class="row" data-track-id="${t.id}">
        <div class="idx">${i + 1}</div>
        <div class="meta">
          <div class="t">${escapeHtml(t.title)}</div>
          <div class="s">${escapeHtml(t.artist)} · ${fmtTime(t.duration)}</div>
        </div>
        <div class="acts">
          <button class="act like-btn ${isLiked(state, t.id) ? 'liked' : ''}" data-action="like" aria-label="喜欢">
            ${isLiked(state, t.id) ? iconHeartFill() : iconHeart()}
          </button>
          <button class="act" data-action="play" aria-label="播放">${iconPlay()}</button>
        </div>
      </div>
    `).join('');

    const queue = tracks.map((t) => t.id);
    host.querySelectorAll('.row').forEach((row) => {
      row.addEventListener('click', () => {
        const trackId = row.getAttribute('data-track-id');
        if (!trackId) return;
        playTrack(trackId, queue);
        location.href = './player.html';
      });
    });

    host.querySelectorAll('[data-action="like"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('[data-track-id]');
        const trackId = row?.getAttribute('data-track-id');
        if (!trackId) return;
        toggleLiked(trackId);
        const next = getState();
        setLikeBtnVisual(btn, isLiked(next, trackId));
      });
    });
  }

  function renderLiked() {
    const host = document.querySelector('[data-el="liked-list"]');
    if (!host) return;
    const state = getState();
    const ids = Array.isArray(state.likedTrackIds) ? state.likedTrackIds : [];
    const tracks = ids.map((id) => db.tracks[id]).filter(Boolean);

    if (!tracks.length) {
      host.innerHTML = `<div class="muted" style="padding:12px;">还没有喜欢的音乐</div>`;
      return;
    }

    host.innerHTML = tracks.map((t, i) => `
      <div class="row" data-track-id="${t.id}">
        <div class="idx">${i + 1}</div>
        <div class="meta">
          <div class="t">${escapeHtml(t.title)}</div>
          <div class="s">${escapeHtml(t.artist)} · ${fmtTime(t.duration)}</div>
        </div>
        <div class="acts">
          <button class="act like-btn liked" data-action="like" aria-label="已喜欢">
            ${iconHeartFill()}
          </button>
          <button class="act" data-action="play" aria-label="播放">${iconPlay()}</button>
        </div>
      </div>
    `).join('');

    const queue = tracks.map((t) => t.id);
    host.querySelectorAll('.row').forEach((row) => {
      row.addEventListener('click', () => {
        const trackId = row.getAttribute('data-track-id');
        if (!trackId) return;
        playTrack(trackId, queue);
        location.href = './player.html';
      });
    });

    host.querySelectorAll('[data-action="like"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('[data-track-id]');
        const trackId = row?.getAttribute('data-track-id');
        if (!trackId) return;
        toggleLiked(trackId);
        const next = getState();
        const stillLiked = isLiked(next, trackId);
        if (!stillLiked) {
          row?.remove();
        } else {
          setLikeBtnVisual(btn, true);
        }
      });
    });

    const plHost = document.querySelector('[data-el="liked-playlists"]');
    if (plHost) {
      const pls = (Array.isArray(state.likedPlaylistIds) ? state.likedPlaylistIds : [])
        .map((pid) => db.playlists.find((p) => p.id === pid))
        .filter(Boolean);
      if (!pls.length) {
        plHost.innerHTML = `<div class="muted" style="padding:12px;">还没有收藏的歌单</div>`;
      } else {
        plHost.innerHTML = `<div class="grid">` + pls.map((p) => `
          <a class="card" href="./playlist.html?id=${encodeURIComponent(p.id)}">
            <div class="thumb"><div class="badge">${fmtCount(p.playCount)} 次播放</div></div>
            <div class="body">
              <div class="name">${escapeHtml(p.name)}</div>
              <div class="sub">${escapeHtml(p.desc)}</div>
            </div>
          </a>
        `).join('') + `</div>`;
      }
    }
  }

  function renderPodcast() {
    const host = document.querySelector('[data-el="podcast-list"]');
    if (!host) return;
    const pods = [
      { title: '今天也想好好生活', sub: '15 分钟治愈电台 · 更新至 EP.12' },
      { title: '上班摸鱼学英语', sub: '通勤碎片时间 · 更新至 EP.38' },
      { title: '音乐人访谈间', sub: '幕后故事 · 更新至 EP.07' }
    ];
    host.innerHTML = pods.map((p) => `
      <div class="row">
        <div class="avatar small" aria-hidden="true">${getInitial(p.title)}</div>
        <div class="meta">
          <div class="t">${escapeHtml(p.title)}</div>
          <div class="s">${escapeHtml(p.sub)}</div>
        </div>
        <button class="act" aria-label="进入">
          <svg class="icon" viewBox="0 0 24 24"><path d="M9 6l6 6l-6 6V6z"/></svg>
        </button>
      </div>
    `).join('');
  }

  function renderSettings() {
    const autoplayEl = document.querySelector('[data-el="set-autoplay"]');
    const wifiEl = document.querySelector('[data-el="set-wifi"]');
    const crossfadeEl = document.querySelector('[data-el="set-crossfade"]');
    const explicitEl = document.querySelector('[data-el="set-explicit"]');
    const langEl = document.querySelector('[data-el="set-lang"]');
    const uiEl = document.querySelector('[data-el="set-ui"]');
    const resetBtn = document.querySelector('[data-action="reset-settings"]');

    function sync() {
      const s = getSettings();
      if (autoplayEl) autoplayEl.checked = !!s.autoplay;
      if (wifiEl) wifiEl.checked = !!s.wifiOnly;
      if (crossfadeEl) crossfadeEl.value = String(s.crossfadeSec ?? 0);
      if (explicitEl) explicitEl.checked = !!s.explicitFilter;
      if (langEl) langEl.value = s.language || 'zh';
      if (uiEl) uiEl.value = s.uiScale || 'md';
      applyUiScale();
    }

    function commit(patch) {
      const cur = getSettings();
      setSettings({ ...cur, ...patch });
    }

    autoplayEl?.addEventListener('change', () => commit({ autoplay: !!autoplayEl.checked }));
    wifiEl?.addEventListener('change', () => commit({ wifiOnly: !!wifiEl.checked }));
    crossfadeEl?.addEventListener('change', () => commit({ crossfadeSec: Number(crossfadeEl.value || 0) }));
    explicitEl?.addEventListener('change', () => commit({ explicitFilter: !!explicitEl.checked }));
    langEl?.addEventListener('change', () => commit({ language: langEl.value === 'en' ? 'en' : 'zh' }));
    uiEl?.addEventListener('change', () => commit({ uiScale: (uiEl.value === 'sm' || uiEl.value === 'lg') ? uiEl.value : 'md' }));

    resetBtn?.addEventListener('click', () => {
      setSettings({
        autoplay: true,
        wifiOnly: false,
        crossfadeSec: 0,
        explicitFilter: false,
        language: 'zh',
        uiScale: 'md'
      });
      sync();
    });

    window.addEventListener('proto:settings', sync);
    sync();
  }

  function renderLogin() {
    const nameEl = document.querySelector('[data-el="login-name"]');
    const emailEl = document.querySelector('[data-el="login-email"]');
    const btn = document.querySelector('[data-action="do-login"]');
    const skip = document.querySelector('[data-action="skip-login"]');

    const u = getUser();
    if (nameEl) nameEl.value = u.loggedIn ? (u.name || '') : '';
    if (emailEl) emailEl.value = u.loggedIn ? (u.email || '') : '';

    btn?.addEventListener('click', () => {
      const name = (nameEl?.value || '').trim() || '用户';
      const email = (emailEl?.value || '').trim();
      const current = getUser();
      const next = { ...current, loggedIn: true, name, email };
      setUser(next);
      upsertAccountFromUser(next);
      location.href = './index.html';
    });

    skip?.addEventListener('click', () => {
      location.href = './index.html';
    });
  }

  function renderAvatarCrop() {
    const canvas = document.querySelector('[data-el="crop-canvas"]');
    const zoomEl = document.querySelector('[data-el="crop-zoom"]');
    const sizeEl = document.querySelector('[data-el="crop-size"]');
    const saveBtn = document.querySelector('[data-action="crop-save"]');
    const cancelBtn = document.querySelector('[data-action="crop-cancel"]');

    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const src = sessionStorage.getItem('neMusicProto_crop_src');
    const ret = sessionStorage.getItem('neMusicProto_crop_return') || './profile.html';
    if (!src) {
      location.href = ret;
      return;
    }

    const img = new Image();
    img.src = src;

    const state = {
      zoom: 1,
      cropScale: 0.36,
      cx: canvas.width / 2,
      cy: canvas.height / 2,
      dragging: false,
      dragDx: 0,
      dragDy: 0
    };

    function fitCanvas() {
      const w = canvas.clientWidth || 320;
      const h = canvas.clientHeight || 420;
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      state.cx = canvas.width / 2;
      state.cy = canvas.height / 2;
      draw();
    }

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

    function getImageDraw() {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;
      const base = Math.max(cw / iw, ch / ih);
      const s = base * state.zoom;
      const w = iw * s;
      const h = ih * s;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      return { x, y, w, h, s };
    }

    function draw() {
      if (!img.naturalWidth) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0b0b0e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }
      const { x, y, w, h } = getImageDraw();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0b0b0e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, w, h);

      const r = Math.min(canvas.width, canvas.height) * state.cropScale;

      // Dim outside circle
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,.48)';
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.arc(state.cx, state.cy, r, 0, Math.PI * 2, true);
      ctx.fill('evenodd');
      ctx.restore();

      // Circle border
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,.85)';
      ctx.lineWidth = Math.max(2, canvas.width * 0.006);
      ctx.beginPath();
      ctx.arc(state.cx, state.cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function canvasPoint(ev) {
      const rect = canvas.getBoundingClientRect();
      const dprX = canvas.width / rect.width;
      const dprY = canvas.height / rect.height;
      const x = (ev.clientX - rect.left) * dprX;
      const y = (ev.clientY - rect.top) * dprY;
      return { x, y };
    }

    function insideCircle(px, py) {
      const r = Math.min(canvas.width, canvas.height) * state.cropScale;
      const dx = px - state.cx;
      const dy = py - state.cy;
      return (dx * dx + dy * dy) <= r * r;
    }

    canvas.addEventListener('pointerdown', (ev) => {
      const { x, y } = canvasPoint(ev);
      if (!insideCircle(x, y)) return;
      state.dragging = true;
      state.dragDx = x - state.cx;
      state.dragDy = y - state.cy;
      canvas.setPointerCapture(ev.pointerId);
    });
    canvas.addEventListener('pointermove', (ev) => {
      if (!state.dragging) return;
      const { x, y } = canvasPoint(ev);
      const r = Math.min(canvas.width, canvas.height) * state.cropScale;
      state.cx = clamp(x - state.dragDx, r, canvas.width - r);
      state.cy = clamp(y - state.dragDy, r, canvas.height - r);
      draw();
    });
    canvas.addEventListener('pointerup', () => { state.dragging = false; });
    canvas.addEventListener('pointercancel', () => { state.dragging = false; });

    zoomEl?.addEventListener('input', () => {
      state.zoom = clamp(Number(zoomEl.value || 1), 1, 3);
      draw();
    });
    sizeEl?.addEventListener('input', () => {
      state.cropScale = clamp(Number(sizeEl.value || 0.36), 0.22, 0.46);
      const r = Math.min(canvas.width, canvas.height) * state.cropScale;
      state.cx = clamp(state.cx, r, canvas.width - r);
      state.cy = clamp(state.cy, r, canvas.height - r);
      draw();
    });

    saveBtn?.addEventListener('click', () => {
      if (!img.naturalWidth) return;
      const outSize = 256;
      const r = Math.min(canvas.width, canvas.height) * state.cropScale;
      const scale = outSize / (2 * r);
      const { x, y, w, h } = getImageDraw();

      const out = document.createElement('canvas');
      out.width = outSize;
      out.height = outSize;
      const octx = out.getContext('2d');
      if (!octx) return;

      octx.clearRect(0, 0, outSize, outSize);
      octx.save();
      octx.beginPath();
      octx.arc(outSize / 2, outSize / 2, outSize / 2, 0, Math.PI * 2);
      octx.clip();

      const bx = state.cx - r;
      const by = state.cy - r;
      octx.drawImage(img, (x - bx) * scale, (y - by) * scale, w * scale, h * scale);
      octx.restore();

      const avatarDataUrl = out.toDataURL('image/png');
      const u = getUser();
      setUser({ ...u, avatarDataUrl });
      sessionStorage.removeItem('neMusicProto_crop_src');
      sessionStorage.removeItem('neMusicProto_crop_return');
      location.href = ret;
    });

    cancelBtn?.addEventListener('click', () => {
      sessionStorage.removeItem('neMusicProto_crop_src');
      sessionStorage.removeItem('neMusicProto_crop_return');
      location.href = ret;
    });

    window.addEventListener('resize', () => fitCanvas());
    img.onload = () => {
      if (zoomEl) zoomEl.value = '1';
      if (sizeEl) sizeEl.value = String(state.cropScale);
      fitCanvas();
    };
  }

  function renderProfile() {
    const avatarEl = document.querySelector('[data-el="profile-avatar"]');
    const titleEl = document.querySelector('[data-el="profile-title"]');
    const sigPreviewEl = document.querySelector('[data-el="profile-signature-preview"]');
    const nameEl = document.querySelector('[data-el="profile-name"]');
    const sigEl = document.querySelector('[data-el="profile-signature"]');
    const fileEl = document.querySelector('[data-el="profile-file"]');
    const emailEl = document.querySelector('[data-el="profile-email"]');
    const addressEl = document.querySelector('[data-el="profile-address"]');
    const genderEl = document.querySelector('[data-el="profile-gender"]');
    const saveBtn = document.querySelector('[data-action="save-profile"]');

    const u = getUser();
    if (nameEl) nameEl.value = u.name;
    if (sigEl) sigEl.value = u.signature || '';
    if (emailEl) emailEl.value = u.email || '';
    if (addressEl) addressEl.value = u.address || '';
    if (genderEl) genderEl.value = u.gender || '';
    if (avatarEl) renderAvatarInto(avatarEl);
    if (titleEl) titleEl.textContent = u.name || '访客';
    if (sigPreviewEl) sigPreviewEl.textContent = (u.signature || '').trim() || '点击头像更换；信息保存在本地';

    avatarEl?.addEventListener('click', () => fileEl?.click());
    fileEl?.addEventListener('change', () => {
      const f = fileEl.files?.[0];
      if (!f) return;
      if (!f.type?.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        const src = typeof reader.result === 'string' ? reader.result : null;
        if (!src) return;
        sessionStorage.setItem('neMusicProto_crop_src', src);
        sessionStorage.setItem('neMusicProto_crop_return', './profile.html');
        location.href = './avatar-crop.html';
      };
      reader.readAsDataURL(f);
      fileEl.value = '';
    });

    saveBtn?.addEventListener('click', () => {
      const current = getUser();
      const nextName = (nameEl?.value || '').trim() || '访客';
      const nextSignature = (sigEl?.value || '').trim().slice(0, 40);
      const nextEmail = (emailEl?.value || '').trim();
      const nextAddress = (addressEl?.value || '').trim();
      const nextGender = (genderEl?.value || '').trim();
      setUser({ ...current, name: nextName, signature: nextSignature, email: nextEmail, address: nextAddress, gender: nextGender });
      if (saveBtn) {
        const old = saveBtn.textContent;
        saveBtn.textContent = '已保存';
        setTimeout(() => { saveBtn.textContent = old || '保存'; }, 900);
      }
    });

    window.addEventListener('proto:user', () => {
      const current = getUser();
      if (avatarEl) renderAvatarInto(avatarEl);
      document.querySelectorAll('[data-user-avatar]').forEach((el) => renderAvatarInto(el));
      if (nameEl && document.activeElement !== nameEl) nameEl.value = current.name;
      if (sigEl && document.activeElement !== sigEl) sigEl.value = current.signature || '';
      if (emailEl && document.activeElement !== emailEl) emailEl.value = current.email || '';
      if (addressEl && document.activeElement !== addressEl) addressEl.value = current.address || '';
      if (genderEl && document.activeElement !== genderEl) genderEl.value = current.gender || '';
      if (titleEl) titleEl.textContent = current.name || '访客';
      if (sigPreviewEl) sigPreviewEl.textContent = (current.signature || '').trim() || '点击头像更换；信息保存在本地';
    });
  }

  function boot() {
    applyUiScale();
    mountTabbar();
    mountMiniPlayer();
    mountUserAvatars();
    mountDrawerName();
    ensureCurrentAccountStored();
    mountMenuHeader();
    window.addEventListener('proto:user', () => mountUserAvatars());
    window.addEventListener('proto:user', () => mountDrawerName());
    window.addEventListener('proto:user', () => mountMenuHeader());
    window.addEventListener('proto:settings', () => applyUiScale());

    const page = document.body.dataset.page || '';
    if (page === 'discover') { renderDiscover(); wireAppMenu(); }
    if (page === 'search') renderSearch();
    if (page === 'playlist') renderPlaylist();
    if (page === 'player') renderPlayer();
    if (page === 'profile') renderProfile();
    if (page === 'recent') renderRecent();
    if (page === 'liked') renderLiked();
    if (page === 'podcast') renderPodcast();
    if (page === 'settings') renderSettings();
    if (page === 'login') renderLogin();
    if (page === 'avatar-crop') renderAvatarCrop();

    window.addEventListener('proto:state', () => mountMiniPlayer());
    setInterval(tickProgress, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
