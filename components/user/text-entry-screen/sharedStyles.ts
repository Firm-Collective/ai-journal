// sharedStyles.ts
import {StyleSheet} from 'react-native';

export const sharedStyles = StyleSheet.create({
  // Modal overlay styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  // Content container styles
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxWidth: 380,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingBottom: 0,
  },
  dividerContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  optionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    borderColor: '#800080',
    backgroundColor: '#800080',
  },
  optionIcon: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  actionButtonActive: {
    backgroundColor: '#800080',
  },
  actionButtonInactive: {
    backgroundColor: '#E0E0E0',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});