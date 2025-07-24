import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
    expect(appService).toBeDefined();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should delegate to AppService.getHello()', () => {
      const spy = jest.spyOn(appService, 'getHello').mockReturnValue('Mocked!');
      const result = appController.getHello();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe('Mocked!');
    });

    it('should propagate errors thrown by the service', () => {
      const err = new Error('boom');
      jest.spyOn(appService, 'getHello').mockImplementation(() => {
        throw err;
      });
      expect(() => appController.getHello()).toThrow('boom');
    });

    it('should match snapshot', () => {
      expect(appController.getHello()).toMatchSnapshot();
    });
  });

  describe('with overridden provider', () => {
    it('should use the overridden AppService implementation', async () => {
      const overriddenModule: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
      })
        .overrideProvider(AppService)
        .useValue({
          getHello: () => 'Overridden!',
        })
        .compile();

      const overriddenController = overriddenModule.get<AppController>(AppController);
      expect(overriddenController.getHello()).toBe('Overridden!');
    });
  });
});
