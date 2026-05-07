<script setup lang="ts" name="m_mine_koc_team">
import { ref, computed, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import Track from '@/bo/track'
import Toast from '@/utils/toast'
import TeamStatisticCard from './components/TeamStatisticCard.vue'
import AddTeamMemberModal from './components/AddTeamMemberModal.vue'
import TeamMemberList from './components/TeamMemberList.vue'

const router = useRouter()
const showAddModal = ref(false)
const teamMembers = ref([])
const loading = ref(false)
const pageIndex = ref(1)
const pageSize = ref(10)
const isNoMore = ref(false)

// 统计数据
const teamStats = ref({
  totalMembers: 0,
  totalInviteCount: 0,
  totalConvertCount: 0,
})

// 加载团队成员列表
const loadTeamMembers = async (isForce = false) => {
  if (loading.value) return
  if (isNoMore.value && !isForce) return

  if (isForce) {
    pageIndex.value = 1
    teamMembers.value = []
    isNoMore.value = false
  }

  loading.value = true
  try {
    // TODO: 调用后端API获取团队成员列表
    // const response = await api.getKocTeamMembers({ pageIndex: pageIndex.value, pageSize: pageSize.value })
    // teamMembers.value = isForce ? response.items : [...teamMembers.value, ...response.items]
    // teamStats.value = response.summary
    // isNoMore.value = response.total <= pageIndex.value * pageSize.value
    // pageIndex.value++

    // 暂时使用本地数据
    if (isForce) {
      teamMembers.value = [
        {
          distributorId: 1,
          distributorName: '张三',
          distributorPhone: '13812345678',
          inviteCode: 'KOC_M_001234',
          tag: '微信群1',
          joinTime: '2026-05-01 10:30:00',
          status: 1,
          inviteCount: 28,
          convertCount: 10,
          tryCount: 20,
          chatCount: 8,
        },
        {
          distributorId: 2,
          distributorName: '李四',
          distributorPhone: '13912345679',
          inviteCode: 'KOC_M_001235',
          tag: '朋友圈',
          joinTime: '2026-05-02 14:20:00',
          status: 1,
          inviteCount: 35,
          convertCount: 15,
          tryCount: 25,
          chatCount: 12,
        },
      ]
      teamStats.value = {
        totalMembers: 2,
        totalInviteCount: 63,
        totalConvertCount: 25,
      }
    }
  } catch (error) {
    console.error('Failed to load team members:', error)
    Toast.showToast({ title: '加载失败，请重试' })
  } finally {
    loading.value = false
  }
}

// 删除下属
const handleDeleteMember = async (distributorId: number) => {
  try {
    // TODO: 调用后端API删除下属
    // await api.deleteKocTeamMember(distributorId)
    Toast.showToast({ title: '删除成功' })
    await loadTeamMembers(true)
  } catch (error) {
    console.error('Failed to delete member:', error)
    Toast.showToast({ title: '删除失败，请重试' })
  }
}

// 查看下属详情
const handleViewDetail = (member: any) => {
  Track.logReport({
    name: 'mobile_koc_team_member_detail_click',
    dataset: {
      distributorId: member.distributorId,
      distributorName: member.distributorName,
    },
  })
  router.push({
    name: 'm_mine_koc_team_detail',
    params: { distributorId: member.distributorId },
  })
}

// 查看邀请码
const handleViewInviteCode = (member: any) => {
  Track.logReport({
    name: 'mobile_koc_team_invite_code_click',
    dataset: {
      distributorId: member.distributorId,
      inviteCode: member.inviteCode,
    },
  })
  // TODO: 显示邀请码弹窗
  Toast.showToast({ title: `邀请码: ${member.inviteCode}` })
}

// 添加下属
const handleAddMember = async (formData: any) => {
  try {
    // TODO: 调用后端API添加下属
    // const response = await api.addKocTeamMember(formData)
    Toast.showToast({ title: '添加成功' })
    showAddModal.value = false
    await loadTeamMembers(true)
  } catch (error) {
    console.error('Failed to add member:', error)
    Toast.showToast({ title: '添加失败，请重试' })
  }
}

const goBack = () => router.back()

onMounted(() => {
  Track.logReport({
    name: 'mobile_koc_team_page_view',
    dataset: {},
  })
  loadTeamMembers(true)
})

onActivated(() => {
  loadTeamMembers(true)
})
</script>

<template>
  <div class="koc-team-page">
    <!-- 顶部导航 -->
    <div class="page-header">
      <div class="header-content">
        <button class="btn-back" @click="goBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        <h1 class="header-title">团队管理</h1>
        <div class="header-spacer"></div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 团队统计卡片 -->
      <TeamStatisticCard :stats="teamStats" />

      <!-- 添加下属按钮 -->
      <div class="add-member-section">
        <button class="btn-add-member" @click="showAddModal = true">
          <span class="icon">+</span>
          <span class="text">添加下属</span>
        </button>
      </div>

      <!-- 下属列表 -->
      <div class="team-members-section">
        <div v-if="teamMembers.length === 0 && !loading" class="empty-state">
          <div class="empty-icon">📋</div>
          <p class="empty-text">还没有下属，点击"添加下属"开始管理团队</p>
        </div>

        <TeamMemberList
          v-else
          :members="teamMembers"
          :loading="loading"
          @view-detail="handleViewDetail"
          @view-invite-code="handleViewInviteCode"
          @delete-member="handleDeleteMember"
        />
      </div>
    </div>

    <!-- 添加下属弹窗 -->
    <AddTeamMemberModal
      v-model:show="showAddModal"
      @submit="handleAddMember"
    />
  </div>
</template>

<style lang="less" scoped>
.koc-team-page {
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

    .add-member-section {
      padding: 16px;

      .btn-add-member {
        width: 100%;
        height: 48px;
        border: 1px solid #0052ff;
        background: #fff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #0052ff;
        transition: all 0.3s ease;

        .icon {
          font-size: 16px;
        }

        &:active {
          background: #f0f5ff;
        }
      }
    }

    .team-members-section {
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
    }
  }
}

html[data-theme='dark'] .koc-team-page {
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
    .add-member-section {
      .btn-add-member {
        background: transparent;
        border-color: #0052ff;
        color: #0052ff;

        &:active {
          background: rgba(0, 82, 255, 0.1);
        }
      }
    }
  }
}
</style>
