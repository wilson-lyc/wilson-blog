<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__copyright">
        Copyright © Wilson. All rights reserved.
      </div>

      <div class="app-footer__records">
        <div class="record-item">
          <img
            class="record-item__icon"
            src="/ba.png"
            alt=""
            width="15"
            height="15"
          >
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=44020402000374"
            target="_blank"
            rel="noopener noreferrer"
          >
            粤公网安备44020402000374号
          </a>
        </div>

        <div class="record-item">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            粤ICP备2023033182号
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.6;
}

.app-footer__inner {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.app-footer__copyright {
  flex-shrink: 0;
}

.app-footer__records {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.record-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.record-item a {
  text-decoration: none;
}

.record-item__icon {
  display: block;
  flex-shrink: 0;
}

@media (max-width: 760px) {
  .app-footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .app-footer__records {
    justify-content: flex-start;
  }
}
</style>
