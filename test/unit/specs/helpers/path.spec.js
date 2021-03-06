import { filePathToUrl, fileUrlToPath } from '../../../../src/renderer/helpers/path';

describe('helper.path', () => {
  it('should convert file path to url correctly', () => {
    expect(filePathToUrl('/home/test/测试.mp4')).to.be.equal('file:///home/test/%E6%B5%8B%E8%AF%95.mp4');
    expect(filePathToUrl('C:\\Users\\test\\测试.mp4')).to.be.equal('file:///C:/Users/test/%E6%B5%8B%E8%AF%95.mp4');
  });
  it('should convert file url to path correctly', () => {
    const currentPlatform = process.platform;

    ['darwin', 'freebsd', 'linux', 'openbsd'].forEach((platform) => {
      Object.defineProperty(process, 'platform', { value: platform });
      expect(fileUrlToPath('file:///home/test/%E6%B5%8B%E8%AF%95.mp4?a=1&b=2#c')).to.be.equal('/home/test/测试.mp4');
    });

    Object.defineProperty(process, 'platform', { value: 'win32' });
    expect(fileUrlToPath('file:///C:/Users/test/%E6%B5%8B%E8%AF%95.mp4?a=1&b=2#c')).to.be.equal('C:\\Users\\test\\测试.mp4');

    Object.defineProperty(process, 'platform', { value: currentPlatform });
  });
});
