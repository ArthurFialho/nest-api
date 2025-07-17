import { Test, TestingModule } from '@nestjs/testing';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('DevelopersController', () => {
  let controller: DevelopersController;
  let service: DevelopersService;

  const mockDeveloper = {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    skills: ['JavaScript', 'TypeScript', 'Node.js'],
    experience: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDevelopersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findBySkill: jest.fn(),
    findByExperience: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [
        {
          provide: DevelopersService,
          useValue: mockDevelopersService,
        },
      ],
    }).compile();

    controller = module.get<DevelopersController>(DevelopersController);
    service = module.get<DevelopersService>(DevelopersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a developer successfully', async () => {
      const createDeveloperDto: CreateDeveloperDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        skills: ['JavaScript', 'TypeScript'],
        experience: 3,
      };

      mockDevelopersService.create.mockResolvedValue(mockDeveloper);

      const result = await controller.create(createDeveloperDto);

      expect(service.create).toHaveBeenCalledWith(createDeveloperDto);
      expect(result).toEqual(mockDeveloper);
    });

    it('should throw BadRequestException when invalid data is provided', async () => {
      const invalidDto: CreateDeveloperDto = {
        name: '',
        email: 'invalid-email',
        skills: [],
        experience: -1,
      };

      mockDevelopersService.create.mockRejectedValue(new BadRequestException('Invalid data'));

      await expect(controller.create(invalidDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of developers', async () => {
      const developers = [mockDeveloper, { ...mockDeveloper, id: 2, name: 'Maria Santos' }];
      mockDevelopersService.findAll.mockResolvedValue(developers);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(developers);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no developers exist', async () => {
      mockDevelopersService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a developer by id', async () => {
      mockDevelopersService.findOne.mockResolvedValue(mockDeveloper);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDeveloper);
    });

    it('should throw NotFoundException when developer is not found', async () => {
      mockDevelopersService.findOne.mockRejectedValue(new NotFoundException('Developer not found'));

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });

    it('should handle invalid id format', async () => {
      mockDevelopersService.findOne.mockRejectedValue(new BadRequestException('Invalid ID format'));

      await expect(controller.findOne('invalid')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a developer successfully', async () => {
      const updateDto: UpdateDeveloperDto = {
        name: 'João Silva Updated',
        skills: ['JavaScript', 'TypeScript', 'React'],
      };

      const updatedDeveloper = { ...mockDeveloper, ...updateDto };
      mockDevelopersService.update.mockResolvedValue(updatedDeveloper);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedDeveloper);
    });

    it('should throw NotFoundException when updating non-existent developer', async () => {
      const updateDto: UpdateDeveloperDto = { name: 'New Name' };
      mockDevelopersService.update.mockRejectedValue(new NotFoundException('Developer not found'));

      await expect(controller.update('999', updateDto)).rejects.toThrow(NotFoundException);
    });

    it('should handle partial updates', async () => {
      const updateDto: UpdateDeveloperDto = { experience: 7 };
      const updatedDeveloper = { ...mockDeveloper, experience: 7 };
      
      mockDevelopersService.update.mockResolvedValue(updatedDeveloper);

      const result = await controller.update('1', updateDto);

      expect(result.experience).toBe(7);
      expect(result.name).toBe(mockDeveloper.name);
    });
  });

  describe('remove', () => {
    it('should remove a developer successfully', async () => {
      mockDevelopersService.remove.mockResolvedValue({ message: 'Developer deleted successfully' });

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Developer deleted successfully' });
    });

    it('should throw NotFoundException when removing non-existent developer', async () => {
      mockDevelopersService.remove.mockRejectedValue(new NotFoundException('Developer not found'));

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findBySkill', () => {
    it('should return developers filtered by skill', async () => {
      const developersWithJs = [mockDeveloper];
      mockDevelopersService.findBySkill.mockResolvedValue(developersWithJs);

      const result = await controller.findBySkill('JavaScript');

      expect(service.findBySkill).toHaveBeenCalledWith('JavaScript');
      expect(result).toEqual(developersWithJs);
    });

    it('should return empty array when no developers have the skill', async () => {
      mockDevelopersService.findBySkill.mockResolvedValue([]);

      const result = await controller.findBySkill('Python');

      expect(result).toEqual([]);
    });
  });

  describe('findByExperience', () => {
    it('should return developers filtered by minimum experience', async () => {
      const experiencedDevelopers = [mockDeveloper];
      mockDevelopersService.findByExperience.mockResolvedValue(experiencedDevelopers);

      const result = await controller.findByExperience(3);

      expect(service.findByExperience).toHaveBeenCalledWith(3);
      expect(result).toEqual(experiencedDevelopers);
    });

    it('should handle zero experience filter', async () => {
      const allDevelopers = [mockDeveloper];
      mockDevelopersService.findByExperience.mockResolvedValue(allDevelopers);

      const result = await controller.findByExperience(0);

      expect(service.findByExperience).toHaveBeenCalledWith(0);
      expect(result).toEqual(allDevelopers);
    });
  });

  describe('error handling', () => {
    it('should handle service errors gracefully', async () => {
      mockDevelopersService.findAll.mockRejectedValue(new Error('Database connection failed'));

      await expect(controller.findAll()).rejects.toThrow('Database connection failed');
    });

    it('should handle validation errors', async () => {
      const invalidDto = { name: null, email: 'invalid' };
      mockDevelopersService.create.mockRejectedValue(new BadRequestException('Validation failed'));

      await expect(controller.create(invalidDto as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('integration scenarios', () => {
    it('should handle multiple operations in sequence', async () => {
      // Create
      mockDevelopersService.create.mockResolvedValue(mockDeveloper);
      const created = await controller.create({
        name: 'Test Developer',
        email: 'test@example.com',
        skills: ['JavaScript'],
        experience: 2,
      });

      // Update
      const updateDto = { experience: 3 };
      const updated = { ...created, ...updateDto };
      mockDevelopersService.update.mockResolvedValue(updated);
      
      const result = await controller.update('1', updateDto);

      expect(result.experience).toBe(3);
    });

    it('should handle concurrent requests', async () => {
      const developers = [mockDeveloper];
      mockDevelopersService.findAll.mockResolvedValue(developers);

      const promises = Array(5).fill(null).map(() => controller.findAll());
      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach(result => expect(result).toEqual(developers));
    });
  });
});
