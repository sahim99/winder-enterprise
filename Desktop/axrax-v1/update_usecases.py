import re
import os

# Update PortfolioService
with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/services/portfolio_service.dart', 'r') as f:
    content = f.read()

content = content.replace('Future<PortfolioHoldings> getPortfolioHoldings(String userId) async {', 'Future<PortfolioHoldings> getPortfolioHoldings() async {')
content = content.replace("metadata: {'userId': userId},", "metadata: {},")
content = content.replace("final holdings = await _getPortfolioHoldings(userId);", "final holdings = await _getPortfolioHoldings();")

content = content.replace('Future<PortfolioHoldings> getPortfolioHoldingsById(\n    String userId,\n    String portfolioId,\n  ) async {', 'Future<PortfolioHoldings> getPortfolioHoldingsById(\n    String portfolioId,\n  ) async {')
content = content.replace("metadata: {'userId': userId, 'portfolioId': portfolioId},", "metadata: {'portfolioId': portfolioId},")
content = content.replace("final holdings = await _getPortfolioHoldings(userId, portfolioId);", "final holdings = await _getPortfolioHoldings(portfolioId);") # usecase might be updated to take optional portfolioId

content = content.replace('Future<PortfolioSummary> getPortfolioSummary(String userId) async {', 'Future<PortfolioSummary> getPortfolioSummary() async {')
content = content.replace("final summary = await _getPortfolioSummary(userId);", "final summary = await _getPortfolioSummary();")

content = content.replace('Future<PortfolioSummary> getPortfolioSummaryById(\n    String userId,\n    String portfolioId,\n  ) async {', 'Future<PortfolioSummary> getPortfolioSummaryById(\n    String portfolioId,\n  ) async {')
content = content.replace("final summary = await _getPortfolioSummary(userId, portfolioId);", "final summary = await _getPortfolioSummary(portfolioId);")

content = content.replace('Future<PortfolioList> getPortfoliosList(String userId) async {', 'Future<PortfolioList> getPortfoliosList() async {')
content = content.replace("final portfolioList = await _getPortfoliosList(userId);", "final portfolioList = await _getPortfoliosList();")

content = content.replace('Future<bool> validatePortfolioConsistency(String userId) async {', 'Future<bool> validatePortfolioConsistency() async {')
content = content.replace('_getPortfolioHoldings(userId),', '_getPortfolioHoldings(),')
content = content.replace('_getPortfolioSummary(userId),', '_getPortfolioSummary(),')

with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/services/portfolio_service.dart', 'w') as f:
    f.write(content)

# Update Usecases
def update_file(path, replacements):
    if not os.path.exists(path): return
    with open(path, 'r') as f: content = f.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(path, 'w') as f: f.write(content)

update_file('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/usecases/get_portfolio_holdings.dart', {
    'Future<PortfolioHoldings> call(String userId, [String? portfolioId])': 'Future<PortfolioHoldings> call([String? portfolioId])',
    '_repository.getPortfolioHoldingsById(userId, portfolioId)': '_repository.getPortfolioHoldingsById(portfolioId)',
    '_repository.getPortfolioHoldings(userId)': '_repository.getPortfolioHoldings()',
    "metadata: {'userId': userId, 'portfolioId': portfolioId}": "metadata: {'portfolioId': portfolioId}",
    "metadata: {'userId': userId}": "metadata: {}",
})

update_file('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/usecases/get_portfolio_summary.dart', {
    'Future<PortfolioSummary> call(String userId, [String? portfolioId])': 'Future<PortfolioSummary> call([String? portfolioId])',
    '_repository.getPortfolioSummaryById(userId, portfolioId)': '_repository.getPortfolioSummaryById(portfolioId)',
    '_repository.getPortfolioSummary(userId)': '_repository.getPortfolioSummary()',
    "metadata: {'userId': userId, 'portfolioId': portfolioId}": "metadata: {'portfolioId': portfolioId}",
    "metadata: {'userId': userId}": "metadata: {}",
})

update_file('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/domain/usecases/get_portfolios_list.dart', {
    'Future<PortfolioList> call(String userId)': 'Future<PortfolioList> call()',
    '_repository.getPortfoliosList(userId)': '_repository.getPortfoliosList()',
    "metadata: {'userId': userId}": "metadata: {}",
})
