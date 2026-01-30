(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class d{constructor(){this.sidebar=document.getElementById("sidebar"),this.menuToggle=document.getElementById("menuToggle"),this.sidebarOverlay=document.getElementById("sidebarOverlay"),this.isMobile=this.checkIfMobile(),this.touchStartX=0,this.touchEndX=0,this.isTouching=!1,this.hoverTimeout=null,this.leaveTimeout=null,this.isManuallyCollapsed=!1,this.init()}checkIfMobile(){return window.innerWidth<=768}expandSidebar(){this.sidebar&&(this.sidebar.classList.add("expanded"),this.isMobile&&(this.sidebarOverlay.classList.add("active"),document.body.style.overflow="hidden"),this.isManuallyCollapsed=!1)}collapseSidebar(){this.sidebar&&(this.sidebar.classList.remove("expanded"),this.isMobile&&(this.sidebarOverlay.classList.remove("active"),document.body.style.overflow=""))}manuallyCollapseSidebar(){!this.isMobile&&this.sidebar.classList.contains("expanded")&&(this.collapseSidebar(),this.isManuallyCollapsed=!0,setTimeout(()=>{this.isManuallyCollapsed=!1},5e3))}toggleSidebar(){this.isMobile?this.sidebar.classList.contains("expanded")?this.collapseSidebar():this.expandSidebar():this.sidebar.classList.contains("expanded")?this.manuallyCollapseSidebar():this.expandSidebar()}handleTouchStart(e){this.isMobile||(this.touchStartX=e.touches[0].clientX,this.isTouching=!0,e.target.closest(".sidebar")&&this.expandSidebar())}handleTouchEnd(e){this.isMobile||(this.touchEndX=e.changedTouches[0].clientX,this.isTouching=!1,e.target.closest(".sidebar")&&Math.abs(this.touchEndX-this.touchStartX)<10&&setTimeout(()=>{!this.sidebar.matches(":hover")&&!this.isManuallyCollapsed&&this.collapseSidebar()},300))}handleTouchLeave(){this.isMobile||this.isTouching&&(this.collapseSidebar(),this.isTouching=!1)}handleTouchCancel(){this.isMobile||(this.isTouching=!1,this.collapseSidebar())}handleMouseEnter(){this.isMobile||(this.leaveTimeout&&(clearTimeout(this.leaveTimeout),this.leaveTimeout=null),this.isManuallyCollapsed||(this.hoverTimeout&&clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.isManuallyCollapsed||this.expandSidebar()},100)))}handleMouseLeave(e){if(this.isMobile)return;this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null);const t=e.relatedTarget;this.sidebar.contains(t)||this.isManuallyCollapsed||(this.leaveTimeout&&clearTimeout(this.leaveTimeout),this.leaveTimeout=setTimeout(()=>{!this.sidebar.matches(":hover")&&!this.isManuallyCollapsed&&this.collapseSidebar()},300))}handleResize(){const e=this.isMobile;this.isMobile=this.checkIfMobile(),e&&!this.isMobile?(this.collapseSidebar(),this.sidebarOverlay.classList.remove("active"),document.body.style.overflow="",this.isManuallyCollapsed=!1,this.sidebar.style.transform=""):!e&&this.isMobile&&(this.collapseSidebar(),this.isManuallyCollapsed=!1)}handleSidebarClick(e){this.isMobile||e.target.closest(".nav-item")&&(e.preventDefault(),this.expandSidebar(),this.isManuallyCollapsed=!1)}initEventListeners(){this.menuToggle.addEventListener("click",t=>{t.stopPropagation(),this.toggleSidebar()}),this.sidebarOverlay.addEventListener("click",t=>{this.isMobile&&(t.stopPropagation(),this.collapseSidebar())}),this.sidebar.addEventListener("touchstart",t=>this.handleTouchStart(t)),this.sidebar.addEventListener("touchend",t=>this.handleTouchEnd(t)),this.sidebar.addEventListener("touchleave",()=>this.handleTouchLeave()),this.sidebar.addEventListener("touchcancel",()=>this.handleTouchCancel()),this.sidebar.addEventListener("mouseenter",()=>this.handleMouseEnter()),this.sidebar.addEventListener("mouseleave",t=>this.handleMouseLeave(t)),this.sidebar.addEventListener("click",t=>this.handleSidebarClick(t)),document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",i=>{this.isMobile?this.collapseSidebar():(i.preventDefault(),this.expandSidebar(),this.isManuallyCollapsed=!1)})}),window.addEventListener("resize",()=>this.handleResize()),document.addEventListener("click",t=>{this.isMobile&&this.sidebar.classList.contains("expanded")&&!this.sidebar.contains(t.target)&&!this.menuToggle.contains(t.target)&&!this.sidebarOverlay.contains(t.target)&&this.collapseSidebar()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&(this.isMobile&&this.sidebar.classList.contains("expanded")?this.collapseSidebar():this.isMobile||this.manuallyCollapseSidebar())})}init(){this.sidebar&&(this.isMobile?this.collapseSidebar():(this.collapseSidebar(),this.isManuallyCollapsed=!1),this.initEventListeners())}}class h{constructor(){this.currentPage="home",this.breadcrumb=document.getElementById("breadcrumb"),this.websitesJsonPath="/data/websites.json",this.scriptsJsonPath="/data/scripts.json",this.websiteData=[],this.scriptData=[],this.activeWebsiteTag="all",this.activeScriptTag="all",this.activeFilter="all",this.searchKeyword="",this.dataCache={websites:null,scripts:null,timestamp:null,cacheDuration:300*1e3},this.isLoading=!1,this.usersData=[],this.usersPage=1,this.usersPerPage=10,this.usersView="all",this.usersSearch="",this.SUPABASE_URL="https://ktwhwvafywwekfkvskbk.supabase.co",this.SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0d2h3dmFmeXd3ZWtma3Zza2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2OTU1NDgsImV4cCI6MjA4NDI3MTU0OH0.tSCRz7ENeCT3NXt891equmSBfW_UsXHUdKSVMoxveKQ",this.init()}async init(){this.setupNavigation(),this.setupExplorePage(),this.setupUsersPage(),this.loadInitialPage(),this.setupHashChange(),this.preloadData()}setupUsersPage(){const e=document.getElementById("userSearch");e&&e.addEventListener("input",s=>{this.usersSearch=s.target.value.toLowerCase(),this.usersPage=1,this.renderUsersContent()});const t=document.querySelectorAll(".view-toggle");t.forEach(s=>{s.addEventListener("click",()=>{t.forEach(a=>a.classList.remove("active")),s.classList.add("active"),this.usersView=s.getAttribute("data-view"),this.usersPage=1,this.renderUsersContent()})});const i=document.getElementById("refreshUsers");i&&i.addEventListener("click",()=>{this.refreshUsersData()})}async fetchUsersData(){try{const e=await fetch(this.SUPABASE_URL+"/rest/v1/user_status?select=uid,last_seen",{headers:{apikey:this.SUPABASE_ANON_KEY,Authorization:"Bearer "+this.SUPABASE_ANON_KEY}});if(!e.ok)throw new Error("HTTP "+e.status);return await e.json()}catch(e){throw console.error("获取用户数据失败:",e),e}}async loadUsersData(){const e=document.getElementById("userList");e&&(e.innerHTML=`
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在加载用户数据...</div>
        <div class="loading-subtext">从服务器获取最新状态</div>
      </div>
    `);try{const t=await this.fetchUsersData();this.processUsersData(t),this.renderUsersContent()}catch{this.showUsersError("加载用户数据失败，请稍后重试")}}async refreshUsersData(){const e=document.getElementById("refreshUsers");e&&(e.classList.add("loading"),e.disabled=!0);try{const t=await this.fetchUsersData();this.processUsersData(t),this.renderUsersContent(),this.showNotification("用户数据刷新成功！","success")}catch{this.showNotification("刷新用户数据失败","error")}finally{e&&setTimeout(()=>{e.classList.remove("loading"),e.disabled=!1},500)}}processUsersData(e){const t=Date.now(),i=300*1e3,s=new Set,a=e.filter(n=>s.has(n.uid)?!1:(s.add(n.uid),!0)).map(n=>{const r=new Date(n.last_seen).getTime();return{uid:String(n.uid),lastSeen:r,isOnline:t-r<=i,lastSeenFormatted:this.formatLastSeen(r)}}).sort((n,r)=>n.uid-r.uid);this.usersData=a}formatLastSeen(e){const i=Date.now()-e,s=Math.floor(i/6e4),a=Math.floor(s/60),n=Math.floor(a/24);return i<=300*1e3?"刚刚在线":s<60?`${s}分钟前`:a<24?`${a}小时前`:n<30?`${n}天前`:new Date(e).toLocaleDateString("zh-CN")}renderUsersContent(){const e=this.usersData.length,t=this.usersData.filter(r=>r.isOnline).length;document.getElementById("total-users").textContent=e,document.getElementById("online-users").textContent=t,document.getElementById("last-updated").textContent=new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"});let i=this.usersData.filter(r=>!(this.usersSearch&&!r.uid.includes(this.usersSearch)||this.usersView==="online"&&!r.isOnline||this.usersView==="offline"&&r.isOnline));const s=Math.ceil(i.length/this.usersPerPage),a=(this.usersPage-1)*this.usersPerPage,n=i.slice(a,a+this.usersPerPage);this.renderUserList(n),this.renderPaginationInfo(i.length),this.renderPaginationControls(s)}renderUserList(e){const t=document.getElementById("userList");if(!e||e.length===0){t.innerHTML=`
      <div class="empty">
        <i class="fas fa-search"></i>
        <p>${this.usersSearch?"未找到匹配的用户":"暂无用户数据"}</p>
        <p class="loading-subtext">${this.usersSearch?"尝试搜索其他UID":"请稍后刷新页面"}</p>
      </div>
    `;return}t.innerHTML=e.map(i=>`
    <div class="user-item">
      <img src="https://cdn.luogu.com.cn/upload/usericon/${i.uid}.png" 
           alt="UID ${i.uid}" 
           class="user-avatar">
      <div class="user-info">
        <a href="https://www.luogu.com.cn/user/${i.uid}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="user-link">
          UID ${i.uid}
          <i class="fas fa-external-link-alt"></i>
        </a>
        <div class="user-meta">
          <span class="user-status ${i.isOnline?"status-online":"status-offline"}">
            <i class="fas fa-${i.isOnline?"wifi":"power-off"} status-icon"></i>
            ${i.isOnline?"在线":"离线"}
          </span>
          <span class="last-seen">
            <i class="far fa-clock"></i>
            ${i.lastSeenFormatted}
          </span>
        </div>
      </div>
    </div>
  `).join("")}renderPaginationInfo(e){const t=(this.usersPage-1)*this.usersPerPage+1,i=Math.min(this.usersPage*this.usersPerPage,e);document.getElementById("paginationInfo").innerHTML=`
    显示第 ${t}–${i} 个用户，共 ${e} 个用户
  `}renderPaginationControls(e){const t=document.getElementById("paginationControls");if(e<=1){t.innerHTML="";return}let i="";i+=`
    <button class="pagination-btn" onclick="window.pageManager.changeUsersPage(${this.usersPage-1})" 
            ${this.usersPage===1?"disabled":""}>
      <i class="fas fa-chevron-left"></i>
      上一页
    </button>
  `;for(let s=1;s<=e;s++)s===1||s===e||s>=this.usersPage-2&&s<=this.usersPage+2?i+=`
        <button class="pagination-btn ${s===this.usersPage?"active":""}" 
                onclick="window.pageManager.changeUsersPage(${s})">
          ${s}
        </button>
      `:(s===this.usersPage-3||s===this.usersPage+3)&&(i+='<span class="pagination-btn" style="border: none; cursor: default;">...</span>');i+=`
    <button class="pagination-btn" onclick="window.pageManager.changeUsersPage(${this.usersPage+1})" 
            ${this.usersPage===e?"disabled":""}>
      下一页
      <i class="fas fa-chevron-right"></i>
    </button>
  `,t.innerHTML=i}changeUsersPage(e){this.usersPage=e,this.renderUsersContent()}showUsersError(e){const t=document.getElementById("userList");t&&(t.innerHTML=`
      <div class="error">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${e}</p>
        <button class="retry-btn" onclick="window.pageManager.loadUsersData()">
          重试
        </button>
      </div>
    `)}async deleteUsersByUID(e){const t=e.join(","),i=`${this.SUPABASE_URL}/rest/v1/user_status?uid=in.(${t})`;try{const s=await fetch(i,{method:"DELETE",headers:{apikey:this.SUPABASE_ANON_KEY,Authorization:`Bearer ${this.SUPABASE_ANON_KEY}`,Accept:"application/json"}});return s.ok?(console.log("删除成功:",e),!0):(console.error("删除失败:",s.status,await s.text()),!1)}catch(s){return console.error("删除用户失败:",s),!1}}async preloadData(){this.websiteData.length===0&&await this.loadData("website"),this.scriptData.length===0&&await this.loadData("script")}async fetchData(e){const t=e==="website"?"websites":"scripts",i=e==="website"?this.websitesJsonPath:this.scriptsJsonPath;if(this.dataCache[t]&&this.dataCache.timestamp&&Date.now()-this.dataCache.timestamp<this.dataCache.cacheDuration)return console.log(`使用缓存的${e}数据`),this.dataCache[t];try{this.showLoading(e);const s=await fetch(`${i}?t=${Date.now()}`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache"}});if(!s.ok)throw new Error(`HTTP ${s.status} - ${s.statusText}`);const a=await s.json(),n=e==="website"?a.websites||a:a.scripts||a;return!n||!Array.isArray(n)?(console.warn("数据格式不符合预期，尝试解析原始数据"),a):(this.dataCache[t]=n,this.dataCache.timestamp=Date.now(),console.log(`成功加载${e}数据`,n),n)}catch(s){console.error(`加载${e}数据失败:`,s);const a=this.getDefaultData(e);return this.dataCache[t]=a,this.dataCache.timestamp=Date.now(),a}}getDefaultData(e){return e==="website"?[{id:1,name:"洛谷",url:"https://www.luogu.com.cn",avatar:"https://cdn.luogu.com.cn/upload/usericon/1.png",description:"专业的在线编程学习和竞赛平台，提供丰富的算法题目和社区讨论",tags:["学习","编程","算法","社区"],type:"website"},{id:2,name:"GitHub",url:"https://github.com",avatar:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",description:"全球最大的代码托管平台，开源项目的聚集地",tags:["编程","工具","社区"],type:"website"},{id:3,name:"Stack Overflow",url:"https://stackoverflow.com",avatar:"https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png",description:"程序员问答社区，解决编程难题的最佳去处",tags:["学习","编程","社区"],type:"website"}]:[{id:1,name:"Violentmonkey",url:"https://violentmonkey.github.io",downloadUrl:"https://violentmonkey.github.io/get-it/",avatar:"https://violentmonkey.github.io/icons/icon-48.png",description:"强大的用户脚本管理器，支持 Greasemonkey、Tampermonkey 脚本",tags:["工具","增强","自动化"],type:"script"},{id:2,name:"Tampermonkey",url:"https://www.tampermonkey.net",downloadUrl:"https://www.tampermonkey.net",avatar:"https://www.tampermonkey.net/favicon.ico",description:"最流行的用户脚本管理器，支持 Chrome、Firefox、Safari 等浏览器",tags:["工具","增强","自动化"],type:"script"}]}showLoading(e){const t=document.getElementById(`${e}-grid`);t&&(t.innerHTML=`
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <div class="loading-text">正在加载${e==="website"?"网站":"脚本"}数据...</div>
          <div class="loading-subtext">从本地文件加载推荐数据</div>
        </div>
      `)}showError(e,t){const i=document.getElementById(`${e}-grid`);i&&(i.innerHTML=`
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>加载${e==="website"?"网站":"脚本"}数据失败</p>
          <p>${t}</p>
          <button class="retry-btn" onclick="window.pageManager.retryLoad('${e}')">
            重试
          </button>
        </div>
      `)}showEmptyState(e){const t=document.getElementById(`${e}-grid`);t&&(t.innerHTML=`
        <div class="no-results">
          <i class="fas fa-database"></i>
          <p>暂无${e==="website"?"网站":"脚本"}推荐数据</p>
          <p class="loading-subtext">请检查数据文件或稍后重试</p>
        </div>
      `)}async retryLoad(e){await this.loadData(e)}async loadData(e){try{const t=await this.fetchData(e);e==="website"?(this.websiteData=t,this.renderWebsiteContent()):(this.scriptData=t,this.renderScriptContent())}catch(t){this.showError(e,t.message)}}async refreshAllData(){const e=document.getElementById("refreshBtn");e&&(e.classList.add("loading"),e.disabled=!0);try{this.dataCache.websites=null,this.dataCache.scripts=null,this.dataCache.timestamp=null,await Promise.all([this.loadData("website"),this.loadData("script")]),this.showNotification("数据刷新成功！","success")}catch(t){console.error("刷新数据失败:",t),this.showNotification("刷新数据失败，请检查数据文件","error")}finally{e&&setTimeout(()=>{e.classList.remove("loading"),e.disabled=!1},500)}}showNotification(e,t="success"){const i=document.createElement("div");i.className=`notification ${t}`,i.innerHTML=`
      <i class="fas fa-${t==="success"?"check-circle":"exclamation-circle"}"></i>
      <span>${e}</span>
    `,Object.assign(i.style,{position:"fixed",top:"80px",right:"20px",background:t==="success"?"var(--success-color)":"var(--danger-color)",color:"white",padding:"12px 20px",borderRadius:"8px",display:"flex",alignItems:"center",gap:"10px",zIndex:"10000",animation:"slideIn 0.3s ease",boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}),document.body.appendChild(i),setTimeout(()=>{i.style.animation="slideOut 0.3s ease",setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},300)},3e3)}setupNavigation(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const s=t.getAttribute("data-page");s!=="none"&&this.navigateTo(s)})})}navigateTo(e){this.currentPage=e,document.getElementById("home-page").style.display="none",document.getElementById("explore-page").style.display="none",document.getElementById("users-page").style.display="none",document.getElementById("about-page").style.display="none",e==="home"?(document.getElementById("home-page").style.display="block",this.updateBreadcrumb("首页"),this.updateNavActive("home")):e==="explore"?(document.getElementById("explore-page").style.display="block",this.updateBreadcrumb("探索"),this.updateNavActive("explore"),!this.websiteData||this.websiteData.length===0?this.loadData("website"):this.renderWebsiteContent(),!this.scriptData||this.scriptData.length===0?this.loadData("script"):this.renderScriptContent()):e==="users"?(document.getElementById("users-page").style.display="block",this.updateBreadcrumb("用户"),this.updateNavActive("users"),this.usersData.length===0?this.loadUsersData():this.renderUsersContent()):e==="about"&&(document.getElementById("about-page").style.display="block",this.updateBreadcrumb("关于"),this.updateNavActive("about")),window.location.hash=e}updateBreadcrumb(e){let t;this.currentPage==="home"?t='<i class="fas fa-home"></i>':this.currentPage==="explore"?t=`
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round" class="breadcrumb-svg-icon" aria-hidden="true">
        <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"></path>
        <path d="m13.56 11.747 4.332-.924"></path>
        <path d="m16 21-3.105-6.21"></path>
        <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"></path>
        <path d="m6.158 8.633 1.114 4.456"></path>
        <path d="m8 21 3.105-6.21"></path>
        <circle cx="12" cy="13" r="2"></circle>
      </svg>
    `:this.currentPage==="users"?t='<i class="fas fa-users"></i>':this.currentPage==="about"&&(t='<i class="fas fa-info-circle"></i>'),this.breadcrumb.innerHTML=`
    <a href="#${this.currentPage}" class="breadcrumb-item">
      ${t}
      <span>${e}</span>
    </a>
  `}updateNavActive(e){document.querySelectorAll(".nav-item").forEach(i=>{i.classList.remove("active"),i.getAttribute("data-page")===e&&i.classList.add("active")})}loadInitialPage(){const e=window.location.hash.replace("#","");e==="explore"?this.navigateTo("explore"):e==="users"?this.navigateTo("users"):e==="about"?this.navigateTo("about"):this.navigateTo("home")}setupHashChange(){window.addEventListener("hashchange",()=>{const e=window.location.hash.replace("#","");e==="explore"?this.navigateTo("explore"):e==="users"?this.navigateTo("users"):e==="about"?this.navigateTo("about"):this.navigateTo("home")})}setupExplorePage(){const e=document.getElementById("searchInput"),t=document.getElementById("searchBtn"),i=()=>{this.searchKeyword=e.value.toLowerCase(),this.renderExploreContent()};e.addEventListener("input",i),t.addEventListener("click",i),e.addEventListener("keypress",o=>{o.key==="Enter"&&i()});const s=document.querySelectorAll(".filter-tab");s.forEach(o=>{o.addEventListener("click",()=>{s.forEach(l=>l.classList.remove("active")),o.classList.add("active"),this.activeFilter=o.getAttribute("data-filter"),this.renderExploreContent()})});const a=document.querySelectorAll("#website-tags .tag-filter-item");a.forEach(o=>{o.addEventListener("click",()=>{a.forEach(l=>l.classList.remove("active")),o.classList.add("active"),this.activeWebsiteTag=o.getAttribute("data-tag"),this.renderWebsiteContent()})});const n=document.querySelectorAll("#script-tags .tag-filter-item");n.forEach(o=>{o.addEventListener("click",()=>{n.forEach(l=>l.classList.remove("active")),o.classList.add("active"),this.activeScriptTag=o.getAttribute("data-tag"),this.renderScriptContent()})});const r=document.getElementById("refreshBtn");r&&r.addEventListener("click",()=>{this.refreshAllData()})}renderExploreContent(){this.renderWebsiteContent(),this.renderScriptContent()}renderWebsiteContent(){const e=document.getElementById("website-grid"),t=document.getElementById("website-count");if(!this.websiteData||this.websiteData.length===0){this.showEmptyState("website"),t&&(t.textContent="0");return}let i=this.websiteData.filter(s=>{if(this.activeFilter==="script"||this.activeWebsiteTag!=="all"&&!s.tags.includes(this.activeWebsiteTag))return!1;if(this.searchKeyword){const a=s.name.toLowerCase().includes(this.searchKeyword),n=s.description.toLowerCase().includes(this.searchKeyword),r=s.tags.some(o=>o.toLowerCase().includes(this.searchKeyword));if(!a&&!n&&!r)return!1}return!0});if(t&&(t.textContent=i.length),i.length===0){e.innerHTML=`
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>未找到匹配的网站</p>
          <p class="loading-subtext">尝试更换搜索词或筛选标签</p>
        </div>
      `;return}e.innerHTML=i.map(s=>`
      <div class="recommendation-card" data-type="website">
        <div class="card-header">
          <img src="${s.avatar}" alt="${s.name}" class="card-avatar">
          <div class="card-title-info">
            <div>
              <h3 class="card-title">${s.name}</h3>
            </div>
            <p class="card-url">${s.url}</p>
          </div>
        </div>
        <p class="card-desc">${s.description}</p>
        <div class="card-footer">
          <div class="card-tags">
            ${s.tags.map(a=>`<span class="card-tag">${a}</span>`).join("")}
          </div>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="card-action">
            <i class="fas fa-external-link-alt"></i>
            前往网站
          </a>
        </div>
      </div>
    `).join("")}renderScriptContent(){const e=document.getElementById("script-grid"),t=document.getElementById("script-count");if(!this.scriptData||this.scriptData.length===0){this.showEmptyState("script"),t&&(t.textContent="0");return}let i=this.scriptData.filter(s=>{if(this.activeFilter==="website"||this.activeScriptTag!=="all"&&!s.tags.includes(this.activeScriptTag))return!1;if(this.searchKeyword){const a=s.name.toLowerCase().includes(this.searchKeyword),n=s.description.toLowerCase().includes(this.searchKeyword),r=s.tags.some(o=>o.toLowerCase().includes(this.searchKeyword));if(!a&&!n&&!r)return!1}return!0});if(t&&(t.textContent=i.length),i.length===0){e.innerHTML=`
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>未找到匹配的脚本</p>
          <p class="loading-subtext">尝试更换搜索词或筛选标签</p>
        </div>
      `;return}e.innerHTML=i.map(s=>`
      <div class="recommendation-card" data-type="script">
        <div class="card-header">
          <img src="${s.avatar}" alt="${s.name}" class="card-avatar">
          <div class="card-title-info">
            <div>
              <h3 class="card-title">${s.name}</h3>
            </div>
            <p class="card-url">${s.url}</p>
          </div>
        </div>
        <p class="card-desc">${s.description}</p>
        <div class="card-footer">
          <div class="card-tags">
            ${s.tags.map(a=>`<span class="card-tag">${a}</span>`).join("")}
          </div>
          <a href="${s.downloadUrl||s.url}" target="_blank" rel="noopener noreferrer" class="card-action">
            <i class="fas fa-download"></i>
            下载安装
          </a>
        </div>
      </div>
    `).join("")}}document.addEventListener("DOMContentLoaded",()=>{new d,window.pageManager=new h,document.body.style.opacity="0",setTimeout(()=>{document.body.style.transition="opacity 0.3s ease",document.body.style.opacity="1"},50)});window.addEventListener("beforeunload",()=>{document.body.style.opacity="0"});
