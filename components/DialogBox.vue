<script lang="ts" setup>
import { computed } from 'vue';
import type { DialogType } from '~/types';
import { Overlay } from '~/components';

const props = withDefaults(defineProps<{
  show?: boolean
  title: string
  confirmLabel?: string
  cancelLabel?: string
  hideCancel?: boolean
  dialogType?: DialogType
}>(), {
  show: false,
  dialogType: 'info',
  confirmLabel: 'Yes',
  cancelLabel: 'No',
});
const emit = defineEmits(['onBackdropClick', 'onConfirm', 'onCancel']);

const iconName = computed(() => {
  switch (props.dialogType) {
    case 'warning':
      return 'i-youcan-warning-circle';
    case 'danger':
      return 'alert';
    case 'success':
      return 'checkbox-circle';
    default:
      return 'information';
  }
});

const BackdropClick = () => {
  emit('onBackdropClick');
};
</script>

<template>
  <Overlay :visible="show" @on-backdrop-click="BackdropClick">
    <Transition name="bounce">
      <div v-if="show" class="dialog-box" :class="dialogType">
        <div class="body">
          <div class="content">
            <i class="icon" :class="[dialogType, iconName]" />
            <div class="message">
              <h5>{{ title }}</h5>
            </div>
          </div>
          <div class="footer">
            <PrimaryButton @click="() => emit('onConfirm')">
              {{ confirmLabel }}
            </PrimaryButton>
            <SecondaryButton v-if="!hideCancel" @click="() => emit('onCancel')">
              {{ cancelLabel }}
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Transition>
  </Overlay>
</template>

<style scoped>
.dialog-box {
  box-sizing: border-box;
  max-width: 445px;
  padding: 24px 28px;
  border-radius: 8px;
  background-color: var(--base-white);
  user-select: none;
}
.dialog-box .body {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
.dialog-box .body .content {
  display: flex;
  column-gap: 12px;
  align-items: center;
}
.dialog-box .body .content .message {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.dialog-box .body .content .message h5{
  margin: 0;
  font: var(--text-md-medium);
}
.dialog-box .body .footer {
  display: flex;
  flex-direction: row-reverse;
  column-gap: 8px;
}
.dialog-box .icon {
  color: var(--blue-500);
  width: 24px;
  height: 24px;
}
.dialog-box .icon.warning {
  color: var(--orange-500);
}
.dialog-box .icon.success {
  color: var(--green-600);
}
.dialog-box .icon.danger {
  color: var(--red-500);
}

.bounce-enter-active {
  animation: bounce 0.3s ease-in-out;
}

.bounce-leave-active {
  animation: bounce 0.3s reverse ease-in-out;
}

@keyframes bounce {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
