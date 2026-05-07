<script setup lang="ts" name="m_mine_koc_team_detail">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Track from '@/bo/track'
import Toast from '@/utils/toast'

const router = useRouter()
const route = useRoute()
const distributorId = computed(() => route.params.distributorId)

const memberInfo = ref({
  distributorName: '',
  inviteCode: '',
  tag: '',
})

const stats = ref({
  totalInvite: 0,
  totalConvert: 0,
  tryCount: 0,
  chatCount: 0,
})

const filterStatus = ref('')
const invitationList = ref([])
const loading = ref(false)
const pageIndex = ref(1)
const pageSize = ref(10)
const isNoMore = ref(false)

const filterItems = ref([
  { label: '全部', value: '' },
  { label: '推荐成功', value: 'xq_paid' },
  { label: '已领卡', value: 'xq_tried' },
  { label: '已入营', value: 'room_entered' },
  { label: '未入营', value: 'room_not_enter' },
])

// 加载邀请明细
const loadInvitationList = async (isForce = false) => {
  if (loading.value) return
  if (isNoMore.value && !isForce) return

  if (isForce) {
    pageIndex.value = 1
    invitationList.value = []
    isNoMore.value = false
  }

  loading.value = true
  try {
    // TODO: 调用后端API获取邀请明细
    // const response = await api.getKocMemberInvitations({
    //   distributorId: distributorId.value,
    //   filterStatus: filterStatus.value,
    //   pageIndex: pageIndex.value,
    //   pageSize: pageSize.value
    // })

    // 暂时使用本地数据
    if (isForce) {
      memberInfo.value = {
        distributorName: '张三',
        inviteCode: 'KOC_M_001234',
        tag: '微信群1',
      }

      stats.value = {
        totalInvite: 28,
        totalConvert: 10,
        tryCount: 20,
        chatCount: 8,
      }

      invitationList.value = [
        {
          id: 1,
          wxName: '李四',
          wxAvatar: 'https://avatar.example.com/user1.jpg',
          externalUserWorkAddTime: '2026-05-01 14:30:00',
          statusDesc: '推荐成功',
          status: 'xq_paid',
        },
        {
          id: 2,
          wxName: '王五',
          wxAvatar: 'https://avatar.example.com/user2.jpg',
          externalUserWorkAddTime: '2026-05-02 10:15:00',
          statusDesc: '已领卡',
          status: 'xq_tried',
        },
        {
          id: 3,
          wxName: '赵六',
          wxAvatar: 'https://avatar.example.com/user3.jpg',
          externalUserWorkAddTime: '2026-05-03 09:45:00',
          statusDesc: '已入营',
          status: 'room_entered',
        },
        {
          id: 4,
          wxName: '孙七',
          wxAvatar: 'https://avatar.example.com/user4.jpg',
          externalUserWorkAddTime: '2026-05-04 15:20:00',
          statusDesc: '未入营',
          status: 'room_not_enter',
        },
      ]
    }
  } catch (error) {
    console.error('Failed to load invitations:', error)
    Toast.showToast({ title: '加载失败，请重试' })
  } finally {
    loading.value = false
  }
}

// 筛选
const handleFilterChange = (status: string) => {
  filterStatus.value = status
  loadInvitationList(true)
}

// 返回
const goBack = () => router.back()

// 获取统计数据
const filteredStats = computed(() => {
  if (!filterStatus.value) {
    return stats.value
  }
  // TODO: 根据筛选条件计算统计数据
  return stats.value
})

onMounted(() => {
  Track.logReport({
    name: 'mobile_koc_team_detail_page_view',
    dataset: {
      distributorId: distributorId.value,
    },
  })
  loadInvitationList(true)
})
</script>

<template>
  <div class="koc-team-detail-page">
    <!-- 顶部导航 -->
    <div class="page-header">
      <div class="header-content">
        <button class="btn-back" @click="goBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        <h1 class="header-title">邀请明细</h1>
        <div class="header-spacer"></div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 成员信息卡片 -->
      <div class="member-info-card">
        <div class="info-header">
          <div>
            <h2 class="member-name">{{ memberInfo.distributorName }}</h2>
            <p class="member-tag">{{ memberInfo.tag }}</p>
          </div>
        </div>
        <div class="info-code">
          <span class="code-label">邀请码：</span>
          <span class="code-value">{{ memberInfo.inviteCode }}</span>
        </div>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-value">{{ filteredStats.totalInvite }}</div>
          <div class="stat-label">邀请总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ filteredStats.totalConvert }}</div>
          <div class="stat-label">转化总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ filteredStats.tryCount }}</div>
          <div class="stat-label">已领卡</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ filteredStats.chatCount }}</div>
          <div class="stat-label">已入营</div>
        </div>
      </div>

      <!-- 筛选选项 -->
      <div class="filter-section">
        <div class="filter-tabs">
          <button
            v-for="item in filterItems"
            :key="item.value"
            class="filter-tab"
            :class="{ active: filterStatus === item.value }"
            @click="handleFilterChange(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- 邀请列表 -->
      <div class="invitation-list">
        <div v-if="invitationList.length === 0 && !loading" class="empty-state">
          <div class="empty-icon">📭</div>
          <p class="empty-text">暂无邀请记录</p>
        </div>

        <div v-else>
          <div v-for="item in invitationList" :key="item.id" class="invitation-item">
            <img :src="item.wxAvatar" :alt="item.wxName" class="user-avatar" />
            <div class="user-info">
              <div class="user-name">{{ item.wxName }}</div>
              <div class="user-status">{{ item.statusDesc }}</div>
              <div class="user-time">{{ item.externalUserWorkAddTime }}</div>
            </div>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.koc-team-detail-page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #f4f5f7;

  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: #fff;
    border-bottom: 1px solid #eee;
    z-index: 10;
    display: flex;
    align-items: center;

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 16px;

      .btn-back {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;

        &:active {
          opacity: 0.6;
        }
      }

      .header-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0;
        flex: 1;
        text-align: center;
      }

      .header-spacer {
        width: 32px;
      }
    }
  }

  .page-content {
    flex: 1;
    overflow-y: auto;
    padding-top: 56px;
    padding-bottom: 20px;

    .member-info-card {
      background: #fff;
      margin: 16px;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

      .info-header {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;

        .member-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }

        .member-tag {
          font-size: 12px;
          background: #f0f5ff;
          color: #0052ff;
          border-radius: 4px;
          padding: 2px 8px;
          display: inline-block;
          margin: 0;
        }
      }

      .info-code {
        font-size: 12px;
        background: #f9fafb;
        padding: 8px 12px;
        border-radius: 6px;

        .code-label {
          color: #999;
        }

        .code-value {
          color: #0052ff;
          font-weight: 600;
          font-family: 'Monaco', 'Courier New', monospace;
        }
      }
    }

    .stats-section {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 12px;
      padding: 0 16px;
      margin-bottom: 16px;

      .stat-card {
        background: #fff;
        padding: 16px 12px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

        .stat-value {
          font-size: 18px;
          font-weight: 600;
          color: #0052ff;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .filter-section {
      padding: 0 16px 12px;

      .filter-tabs {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 8px;

        .filter-tab {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 6px;
          font-size: 12px;
          color: #666;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;

          &.active {
            border-color: #0052ff;
            background: #f0f5ff;
            color: #0052ff;
          }

          &:not(.active):active {
            background: #f4f5f7;
          }
        }
      }
    }

    .invitation-list {
      padding: 0 16px;

      .invitation-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #fff;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-info {
          flex: 1;

          .user-name {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            margin-bottom: 2px;
          }

          .user-status {
            font-size: 12px;
            color: #0052ff;
            margin-bottom: 2px;
          }

          .user-time {
            font-size: 12px;
            color: #999;
          }
        }
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        text-align: center;

        .empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .empty-text {
          font-size: 14px;
          color: #999;
          margin: 0;
        }
      }

      .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f0f5ff;
          border-top-color: #0052ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        p {
          font-size: 14px;
          color: #999;
          margin: 0;
        }
      }
    }
  }
}

html[data-theme='dark'] .koc-team-detail-page {
  background: var(--color-fill-1);

  .page-header {
    background: var(--color-fill-2);
    border-bottom-color: var(--color-fill-3);

    .header-content {
      .btn-back {
        color: var(--color-text-1);
      }

      .header-title {
        color: var(--color-text-1);
      }
    }
  }

  .page-content {
    .member-info-card {
      background: var(--color-fill-2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      .info-header {
        .member-name {
          color: var(--color-text-1);
        }

        .member-tag {
          background: rgba(0, 82, 255, 0.1);
        }
      }

      .info-code {
        background: var(--color-fill-1);

        .code-label {
          color: var(--color-text-3);
        }
      }
    }

    .stats-section {
      .stat-card {
        background: var(--color-fill-2);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

        .stat-label {
          color: var(--color-text-3);
        }
      }
    }

    .filter-section {
      .filter-tabs {
        .filter-tab {
          border-color: var(--color-fill-3);
          background: transparent;
          color: var(--color-text-1);

          &.active {
            border-color: #0052ff;
            background: rgba(0, 82, 255, 0.1);
            color: #0052ff;
          }

          &:not(.active):active {
            background: var(--color-fill-1);
          }
        }
      }
    }

    .invitation-list {
      .invitation-item {
        background: var(--color-fill-2);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .user-info {
          .user-name {
            color: var(--color-text-1);
          }

          .user-time {
            color: var(--color-text-3);
          }
        }
      }
    }
  }
}
</style>
