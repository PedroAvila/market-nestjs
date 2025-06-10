export const TAX_USECASE_TOKENS = {
  create: Symbol('ICreateTaxUseCase'),
  update: Symbol('IUpdateTaxUseCase'),
  getAll: Symbol('IGetTaxUseCase'),
  getById: Symbol('IGetByIdTaxUseCase'),
};

export const COMPANY_USECASE_TOKENS = {
  create: Symbol('ICreateCompanyUseCase'),
  update: Symbol('IUpdateCompanyUseCase'),
  getAll: Symbol('IGetCompanyUseCase'),
  getById: Symbol('IGetByIdCompanyUseCase'),
};

export const CODE_GENERATOR_PERSISTENCE_TOKENS = {
  generateCode: Symbol('ICodeGeneratorPort'),
};

export const CODE_GENERATOR_SERVICE_TOKENS = {
  generateCode: Symbol('ICodeGeneratorServicePort'),
};

export const CATEGORY_USECASE_TOKENS = {
  create: Symbol('ICreateCategoryUseCase'),
  update: Symbol('IUpdateCategoryUseCase'),
  getAll: Symbol('IGetCategoryUseCase'),
  getById: Symbol('IGetByIdCategoryUseCase'),
};
