import { Platform } from 'react-native';
import { isLiquidGlassSupported } from '@callstack/liquid-glass';

/**
 * Returns true only when running on iOS 26+ where Liquid Glass is supported.
 * On Android and older iOS this returns false so callers can render their
 * existing solid fallback UI.
 */
export function useGlassSupport(): boolean {
  return Platform.OS === 'ios' && isLiquidGlassSupported;
}
