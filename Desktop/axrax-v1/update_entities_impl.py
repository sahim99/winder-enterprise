import re

# 1. Update PortfolioSummary entity
with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/entities/portfolio_summary.dart', 'r') as f:
    content = f.read()

content = content.replace('    required String userId,\n', '')
content = content.replace('  factory PortfolioSummary.empty(String userId) => PortfolioSummary(\n    userId: userId,\n', '  factory PortfolioSummary.empty() => PortfolioSummary(\n')

with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/entities/portfolio_summary.dart', 'w') as f:
    f.write(content)

# 2. Update PortfolioList entity
with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/entities/portfolio_list.dart', 'r') as f:
    content = f.read()

content = content.replace('    required String userId,\n', '')

with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/entities/portfolio_list.dart', 'w') as f:
    f.write(content)

# 3. Update PortfolioSummaryMapper
with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/data/mappers/portfolio_summary_mapper.dart', 'r') as f:
    content = f.read()

content = content.replace('    PortfolioSummaryDto apiModel,\n    String userId,\n  ) {', '    PortfolioSummaryDto apiModel,\n  ) {')
content = content.replace('        userId: userId,\n', '')
content = content.replace('  static PortfolioSummary createEmpty(String userId) =>\n      PortfolioSummary.empty(userId);', '  static PortfolioSummary createEmpty() =>\n      PortfolioSummary.empty();')
content = content.replace('  static PortfolioSummary createMock({String userId = \'mock-user\'}) =>\n      PortfolioSummary(\n        userId: userId,\n', '  static PortfolioSummary createMock() =>\n      PortfolioSummary(\n')

with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/data/mappers/portfolio_summary_mapper.dart', 'w') as f:
    f.write(content)

# 4. Update PortfolioListMapper (we assume similar structure based on standard mapping)
try:
    with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/data/mappers/portfolio_list_mapper.dart', 'r') as f:
        content = f.read()

    content = content.replace('    PortfolioListDto apiModel,\n    String userId,\n  ) {', '    PortfolioListDto apiModel,\n  ) {')
    content = content.replace('        userId: userId,\n', '')
    content = content.replace('  static PortfolioList createEmpty(String userId) =>\n      PortfolioList.empty(userId);', '  static PortfolioList createEmpty() =>\n      PortfolioList.empty();')
    
    # We might need regular expression if exact formatting differs
    content = re.sub(r'fromApiModel\(\s*PortfolioListDto apiModel,\s*String userId,?\s*\)', r'fromApiModel(PortfolioListDto apiModel)', content)
    content = re.sub(r'userId:\s*userId,', '', content)
    content = re.sub(r'createEmpty\(String userId\)', 'createEmpty()', content)
    content = re.sub(r'PortfolioList\.empty\(userId\)', 'PortfolioList.empty()', content)

    with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/data/mappers/portfolio_list_mapper.dart', 'w') as f:
        f.write(content)
except Exception as e:
    print(f"Error updating PortfolioListMapper: {e}")
