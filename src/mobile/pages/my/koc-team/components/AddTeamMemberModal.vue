<script setup lang="ts">
import { ref, computed } from 'vue'
import Toast from '@/utils/toast'
import Modal from '@/utils/modal'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'submit', data: any): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref({
  distributorName: '',
  distributorPhone: '',
  tag: '',
})

const loading = ref(false)
const generatedCode = ref('')
const inviteCodeExpireTime = ref('')
const showCodeResult = ref(false)

// 验证表单
const isFormValid = computed(() => {
  return (
    formData.value.distributorName.trim().length > 0 &&
    formData.value.distributorPhone.trim().length > 0 &&
    formData.value.tag.trim().length > 0
  )
})

// 验证手机号
const isPhoneValid = (phone: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 生成邀请码
const handleGenerateCode = async () => {
  // 验证表单
  if (!formData.value.distributorName.trim()) {
    Toast.showToast({ title: '请输入下属名字' })
    return
  }

  if (!formData.value.distributorPhone.trim()) {
    Toast.showToast({ title: '请输入下属电话' })
    return
  }

  if (!isPhoneValid(formData.value.distributorPhone)) {
    Toast.showToast({ title: '请输入有效的电话号码' })
    return
  }

  if (!formData.value.tag.trim()) {
    Toast.showToast({ title: '请输入标签' })
    return
  }

  if (formData.value.tag.length > 50) {
    Toast.showToast({ title: '标签长度不能超过50个字符' })
    return
  }

  loading.value = true
  try {
    // TODO: 调用后端API生成邀请码
    // const response = await api.addKocTeamMember(formData.value)
    // generatedCode.value = response.inviteCode
    // inviteCodeExpireTime.value = response.expireTime

    // 暂时使用本地生成
    generatedCode.value = `KOC_M_${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const now = new Date()
    now.setDate(now.getDate() + 7)
    inviteCodeExpireTime.value = now.toLocaleString('zh-CN')

    showCodeResult.value = true
    Toast.showToast({ title: '邀请码生成成功' })

    setTimeout(() => {
      emit('submit', {
        ...formData.value,
        inviteCode: generatedCode.value,
      })
    }, 1000)
  } catch (error) {
    console.error('Failed to generate code:', error)
    Toast.showToast({ title: '生成失败，请重试' })
  } finally {
    loading.value = false
  }
}

// 复制邀请码
const handleCopyCode = () => {
  navigator.clipboard.writeText(generatedCode.value).then(() => {
    Toast.showToast({ title: '已复制到剪贴板' })
  })
}

// 分享邀请码
const handleShareCode = () => {
  if (navigator.share) {
    navigator.share({
      title: '邀请加入推广团队',
      text: `我邀请你加入推广团队，邀请码：${generatedCode.value}，有效期至 ${inviteCodeExpireTime.value}`,
    })
  } else {
    Toast.showToast({ title: '您的浏览器不支持分享功能' })
  }
}

// 关闭弹窗
const handleClose = () => {
  if (showCodeResult.value) {
    showCodeResult.value = false
    generatedCode.value = ''
    inviteCodeExpireTime.value = ''
    formData.value = {
      distributorName: '',
      distributorPhone: '',
      tag: '',
    }
  }
  emit('update:show', false)
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="handleClose">
    <div class="modal-content" @click.stop>
      <!-- 表单阶段 -->
      <div v-if="!showCodeResult" class="form-phase">
        <div class="modal-header">
          <h2 class="modal-title">添加下属</h2>
          <button class="btn-close" @click="handleClose">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <!-- 下属名字 -->
          <div class="form-group">
            <label class="form-label">下属名字 <span class="required">*</span></label>
            <input
              v-model="formData.distributorName"
              type="text"
              class="form-input"
              placeholder="请输入下属的名字"
              maxlength="50"
            />
          </div>

          <!-- 下属电话 -->
          <div class="form-group">
            <label class="form-label">下属电话 <span class="required">*</span></label>
            <input
              v-model="formData.distributorPhone"
              type="tel"
              class="form-input"
              placeholder="请输入下属的电话号码"
              maxlength="20"
            />
          </div>

          <!-- 标签 -->
          <div class="form-group">
            <label class="form-label">标签 <span class="required">*</span></label>
            <input
              v-model="formData.tag"
              type="text"
              class="form-input"
              placeholder="如：微信群1、朋友圈、线下活动"
              maxlength="50"
            />
            <div class="tag-tip">用于分类管理该下属邀请来的用户</div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="handleClose">取消</button>
          <button
            class="btn-submit"
            :disabled="!isFormValid || loading"
            :loading="loading"
            @click="handleGenerateCode"
          >
            {{ loading ? '生成中...' : '生成邀请码' }}
          </button>
        </div>
      </div>

      <!-- 邀请码展示阶段 -->
      <div v-else class="code-phase">
        <div class="modal-header">
          <h2 class="modal-title">邀请码已生成</h2>
          <button class="btn-close" @click="handleClose">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body code-display">
          <div class="member-info">
            <div class="info-row">
              <span class="info-label">下属名字：</span>
              <span class="info-value">{{ formData.distributorName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">标签：</span>
              <span class="info-value">{{ formData.tag }}</span>
            </div>
          </div>

          <div class="invite-code-box">
            <div class="code-label">邀请码</div>
            <div class="code-value">{{ generatedCode }}</div>
            <div class="code-tip">有效期至 {{ inviteCodeExpireTime }}</div>
          </div>

          <div class="code-actions">
            <button class="btn-action btn-copy" @click="handleCopyCode">
              <span class="icon">📋</span>
              <span>复制邀请码</span>
            </button>
            <button class="btn-action btn-share" @click="handleShareCode">
              <span class="icon">📤</span>
              <span>分享邀请码</span>
            </button>
          </div>

          <p class="code-instruction">
            请将邀请码发送给下属，下属拿到码后即可开始推广
          </p>
        </div>

        <div class="modal-footer">
          <button class="btn-submit btn-full" @click="handleClose">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
  animation: slideInOverlay 0.3s ease-out;

  @keyframes slideInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    width: 100%;
    background: #fff;
    border-radius: 16px 16px 0 0;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 16px;
      border-bottom: 1px solid #eee;

      .modal-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      .btn-close {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;

        &:active {
          opacity: 0.6;
        }
      }
    }

    .modal-body {
      padding: 20px 16px;

      &.code-display {
        .member-info {
          background: #f4f5f7;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;

          .info-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;

            &:last-child {
              margin-bottom: 0;
            }

            .info-label {
              font-size: 12px;
              color: #999;
              min-width: 60px;
            }

            .info-value {
              font-size: 14px;
              color: #333;
              font-weight: 500;
            }
          }
        }

        .invite-code-box {
          text-align: center;
          padding: 24px;
          background: #f9fafb;
          border: 2px solid #0052ff;
          border-radius: 12px;
          margin-bottom: 20px;

          .code-label {
            font-size: 12px;
            color: #999;
            margin-bottom: 8px;
          }

          .code-value {
            font-size: 24px;
            font-weight: 600;
            color: #0052ff;
            letter-spacing: 2px;
            margin-bottom: 8px;
            font-family: 'Monaco', 'Courier New', monospace;
          }

          .code-tip {
            font-size: 12px;
            color: #999;
          }
        }

        .code-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;

          .btn-action {
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background: #fff;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: #666;
            transition: all 0.3s ease;

            .icon {
              font-size: 20px;
            }

            &:active {
              background: #f4f5f7;
            }

            &.btn-copy:active {
              border-color: #0052ff;
              color: #0052ff;
            }

            &.btn-share:active {
              border-color: #0052ff;
              color: #0052ff;
            }
          }
        }

        .code-instruction {
          font-size: 12px;
          color: #999;
          text-align: center;
          margin: 0;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
        }
      }
    }

    .form-group {
      margin-bottom: 20px;

      .form-label {
        display: block;
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
        font-weight: 500;

        .required {
          color: #ff4d4f;
        }
      }

      .form-input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        color: #333;
        background: #fff;
        box-sizing: border-box;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #0052ff;
          background: #f9fafb;
        }

        &::placeholder {
          color: #999;
        }
      }

      .tag-tip {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
    }

    .modal-footer {
      display: flex;
      gap: 12px;
      padding: 20px 16px;
      border-top: 1px solid #eee;

      .btn-cancel {
        flex: 1;
        height: 40px;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #666;
        cursor: pointer;
        transition: all 0.3s ease;

        &:active {
          background: #f4f5f7;
        }
      }

      .btn-submit {
        flex: 1;
        height: 40px;
        border: none;
        background: #0052ff;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &:not(:disabled):active {
          background: #003dd4;
        }

        &.btn-full {
          width: 100%;
        }
      }
    }
  }
}

html[data-theme='dark'] .modal-overlay {
  background: rgba(0, 0, 0, 0.7);

  .modal-content {
    background: var(--color-fill-2);

    .modal-header {
      border-bottom-color: var(--color-fill-3);

      .modal-title {
        color: var(--color-text-1);
      }

      .btn-close {
        color: var(--color-text-3);
      }
    }

    .modal-body {
      &.code-display {
        .member-info {
          background: var(--color-fill-1);

          .info-row {
            .info-label {
              color: var(--color-text-3);
            }

            .info-value {
              color: var(--color-text-1);
            }
          }
        }

        .invite-code-box {
          background: var(--color-fill-1);
          border-color: #0052ff;

          .code-label {
            color: var(--color-text-3);
          }

          .code-tip {
            color: var(--color-text-3);
          }
        }

        .code-instruction {
          background: var(--color-fill-1);
          color: var(--color-text-3);
        }
      }
    }

    .form-group {
      .form-label {
        color: var(--color-text-1);
      }

      .form-input {
        border-color: var(--color-fill-3);
        background: var(--color-fill-1);
        color: var(--color-text-1);

        &:focus {
          border-color: #0052ff;
          background: var(--color-fill-2);
        }
      }

      .tag-tip {
        color: var(--color-text-3);
      }
    }

    .modal-footer {
      border-top-color: var(--color-fill-3);

      .btn-cancel {
        border-color: var(--color-fill-3);
        background: transparent;
        color: var(--color-text-1);

        &:active {
          background: var(--color-fill-1);
        }
      }

      .btn-submit {
        background: #0052ff;
        color: #fff;
      }
    }
  }
}
</style>
