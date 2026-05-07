<script setup lang="ts">
interface Props {
  stats: {
    totalMembers: number
    totalInviteCount: number
    totalConvertCount: number
  }
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="team-statistic-card">
    <div class="stat-item">
      <div class="stat-value">{{ stats.totalMembers }}</div>
      <div class="stat-label">总下属数</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">{{ stats.totalInviteCount }}</div>
      <div class="stat-label">总邀请数</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">{{ stats.totalConvertCount }}</div>
      <div class="stat-label">总转化数</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.team-statistic-card {
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  .stat-item {
    flex: 1;
    text-align: center;

    .stat-value {
      font-size: 22px;
      font-weight: 600;
      color: #0052ff;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
    }
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: #eee;
    margin: 0 12px;
  }
}

html[data-theme='dark'] .team-statistic-card {
  background: var(--color-fill-2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  .stat-item {
    .stat-value {
      color: #0052ff;
    }

    .stat-label {
      color: var(--color-text-3);
    }
  }

  .stat-divider {
    background: var(--color-fill-3);
  }
}
</style>
