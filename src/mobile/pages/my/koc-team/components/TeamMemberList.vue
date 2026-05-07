<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/utils/modal'

interface Member {
  distributorId: number
  distributorName: string
  distributorPhone: string
  inviteCode: string
  tag: string
  joinTime: string
  inviteCount: number
  convertCount: number
  tryCount: number
  chatCount: number
}

interface Props {
  members: Member[]
  loading: boolean
}

interface Emits {
  (e: 'view-detail', member: Member): void
  (e: 'view-invite-code', member: Member): void
  (e: 'delete-member', distributorId: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const deletingId = ref<number | null>(null)

const handleViewDetail = (member: Member) => {
  emit('view-detail', member)
}

const handleViewInviteCode = (member: Member) => {
  emit('view-invite-code', member)
}

const handleDeleteMember = (member: Member) => {
  Modal.show({
    title: '确定删除下属？',
    content: `删除后，${member.distributorName} 的邀请码将失效，但已有的邀请记录将保留`,
    confirmText: '删除',
    cancelText: '取消',
    onConfirm: () => {
      deletingId.value = member.distributorId
      emit('delete-member', member.distributorId)
      deletingId.value = null
    },
  })
}
</script>

<template>
  <div class="team-member-list">
    <div v-for="member in members" :key="member.distributorId" class="member-card">
      <!-- 成员基本信息 -->
      <div class="member-header">
        <div class="member-info">
          <h3 class="member-name">{{ member.distributorName }}</h3>
          <p class="member-tag">{{ member.tag }}</p>
          <p class="member-phone">{{ member.distributorPhone }}</p>
        </div>
        <div class="member-stats">
          <div class="stat">
            <div class="stat-num">{{ member.inviteCount }}</div>
            <div class="stat-name">邀请</div>
          </div>
          <div class="stat">
            <div class="stat-num">{{ member.convertCount }}</div>
            <div class="stat-name">转化</div>
          </div>
        </div>
      </div>

      <!-- 详细统计 -->
      <div class="member-details">
        <div class="detail-item">
          <span class="detail-label">已领卡：</span>
          <span class="detail-value">{{ member.tryCount }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">已入营：</span>
          <span class="detail-value">{{ member.chatCount }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">加入时间：</span>
          <span class="detail-value">{{ member.joinTime }}</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="member-actions">
        <button class="btn-action btn-code" @click="handleViewInviteCode(member)">
          查看邀请码
        </button>
        <button class="btn-action btn-detail" @click="handleViewDetail(member)">
          查看详情
        </button>
        <button
          class="btn-action btn-delete"
          :disabled="deletingId === member.distributorId"
          @click="handleDeleteMember(member)"
        >
          {{ deletingId === member.distributorId ? '删除中...' : '删除' }}
        </button>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.team-member-list {
  padding: 0 16px 16px;

  .member-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .member-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 12px;

      .member-info {
        flex: 1;

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
          margin: 4px 0;
        }

        .member-phone {
          font-size: 12px;
          color: #999;
          margin: 4px 0 0 0;
        }
      }

      .member-stats {
        display: flex;
        gap: 16px;
        text-align: center;

        .stat {
          min-width: 50px;

          .stat-num {
            font-size: 16px;
            font-weight: 600;
            color: #0052ff;
            margin-bottom: 4px;
          }

          .stat-name {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }

    .member-details {
      background: #f9fafb;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 12px;
      font-size: 12px;

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;

        .detail-label {
          color: #999;
        }

        .detail-value {
          color: #333;
          font-weight: 500;
        }
      }
    }

    .member-actions {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;

      .btn-action {
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid #ddd;
        background: #fff;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        transition: all 0.3s ease;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &:not(:disabled):active {
          background: #f4f5f7;
        }

        &.btn-code {
          color: #0052ff;
          border-color: #0052ff;

          &:not(:disabled):active {
            background: #f0f5ff;
          }
        }

        &.btn-detail {
          color: #0052ff;
          border-color: #0052ff;

          &:not(:disabled):active {
            background: #f0f5ff;
          }
        }

        &.btn-delete {
          color: #ff4d4f;
          border-color: #ffccc7;

          &:not(:disabled):active {
            background: #fff1f0;
          }
        }
      }
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

html[data-theme='dark'] .team-member-list {
  .member-card {
    background: var(--color-fill-2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    .member-header {
      .member-info {
        .member-name {
          color: var(--color-text-1);
        }

        .member-tag {
          background: rgba(0, 82, 255, 0.1);
          color: #0052ff;
        }

        .member-phone {
          color: var(--color-text-3);
        }
      }

      .member-stats {
        .stat {
          .stat-num {
            color: #0052ff;
          }

          .stat-name {
            color: var(--color-text-3);
          }
        }
      }
    }

    .member-details {
      background: var(--color-fill-1);

      .detail-item {
        .detail-label {
          color: var(--color-text-3);
        }

        .detail-value {
          color: var(--color-text-1);
        }
      }
    }

    .member-actions {
      .btn-action {
        border-color: var(--color-fill-3);
        background: transparent;
        color: var(--color-text-1);

        &:not(:disabled):active {
          background: var(--color-fill-1);
        }

        &.btn-code,
        &.btn-detail {
          color: #0052ff;
          border-color: rgba(0, 82, 255, 0.4);
        }

        &.btn-delete {
          color: #ff4d4f;
          border-color: rgba(255, 77, 79, 0.4);
        }
      }
    }
  }

  .loading-state {
    .spinner {
      border-color: rgba(0, 82, 255, 0.1);
      border-top-color: #0052ff;
    }

    p {
      color: var(--color-text-3);
    }
  }
}
</style>
