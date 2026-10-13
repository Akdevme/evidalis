const INTRO_KEY = 'evidalis_intro_completed';

/**
 * Safely checks if the user has previously completed the introduction.
 * Fails safely if localStorage is unavailable.
 */
export const hasCompletedIntro = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    return window.localStorage.getItem(INTRO_KEY) === 'true' || window.localStorage.getItem('insightflow_intro_completed') === 'true';
  } catch (err) {
    console.warn('[Evidalis] localStorage unavailable:', err);
    return false;
  }
};

/**
 * Safely marks the introduction as completed.
 */
export const markIntroCompleted = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(INTRO_KEY, 'true');
    }
  } catch (err) {
    console.warn('[Evidalis] Failed to write localStorage:', err);
  }
};

/**
 * Clears completion state (useful for testing).
 */
export const clearIntroCompleted = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(INTRO_KEY);
      window.localStorage.removeItem('insightflow_intro_completed');
    }
  } catch (err) {
    console.warn('[Evidalis] Failed to clear localStorage:', err);
  }
};
