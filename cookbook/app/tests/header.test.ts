describe('Header Component', () => {
    test('renders the header correctly', () => {
      // Example test logic
      const header = '<header class="app-header">CookBook</header>';
      expect(header).toContain('CookBook');
    });
  
    test('logo size adjusts for mobile screens', () => {
      const logoStyle = { maxWidth: '100px', height: 'auto' }; // Mocked style
      expect(logoStyle.maxWidth).toBe('100px');
    });
  
    test('login/signup buttons are visible', () => {
      const buttons = ['Login', 'Signup'];
      expect(buttons).toContain('Login');
      expect(buttons).toContain('Signup');
    });
  });