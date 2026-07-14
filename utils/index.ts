export function asTuple(arr: string[]): readonly [string, string] {
  if (arr.length !== 2) {
    throw new Error("Expected array of length 2");
  }
  return [arr[0], arr[1]] as [string, string];
}

export function cleanPhoneNumber(phoneNumber: string) {
  return "+92" + phoneNumber.replaceAll("-", "");
}

// Improved autofill detection algorithm
export const detectAutofill = (newValue: string, oldValue: string): boolean => {
  const lengthDiff = newValue.length - oldValue.length;

  // Case 1: Large jump in length (definitely autofill)
  if (Math.abs(lengthDiff) > 1) {
    return true;
  }

  // Case 2: Complete 4-digit input when starting from empty (autofill)
  if (newValue.length === 4 && oldValue.length === 0) {
    return true;
  }

  // Case 3: Same length but different content - check if it's a single digit change
  if (lengthDiff === 0 && newValue.length > 0) {
    // Count how many positions are different
    let diffCount = 0;
    const minLength = Math.min(newValue.length, oldValue.length);

    for (let i = 0; i < minLength; i++) {
      if (newValue[i] !== oldValue[i]) {
        diffCount++;
      }
    }

    // If only 1 digit is different, it's manual replacement, not autofill
    if (diffCount === 1) {
      return false;
    }

    // If multiple digits are different, likely autofill
    if (diffCount > 1) {
      return true;
    }
  }

  // Case 4: Length increased by 1 - check if it's sequential addition
  if (lengthDiff === 1) {
    // Check if new value starts with old value (sequential addition)
    if (newValue.startsWith(oldValue)) {
      return false; // Manual sequential input
    } else {
      // New value doesn't start with old value, likely autofill replacement
      return true;
    }
  }

  // Case 5: Length decreased by 1 - always manual deletion
  if (lengthDiff === -1) {
    return false;
  }

  // Default to manual for other cases
  return false;
};