import path from 'path';

export default {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp|svg)$': path.resolve(__dirname, '__mocks__/fileMock.js'),
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
