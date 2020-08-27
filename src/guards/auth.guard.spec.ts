import { Guards\authGuard } from './guards\auth.guard';

describe('Guards\authGuard', () => {
  it('should be defined', () => {
    expect(new Guards\authGuard()).toBeDefined();
  });
});
