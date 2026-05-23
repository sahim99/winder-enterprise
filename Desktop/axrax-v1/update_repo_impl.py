import re

with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/data/repositories/portfolio_repository_impl.dart', 'r') as f:
    content = f.read()

# Replace method signatures
content = content.replace('Future<PortfolioHoldings> getPortfolioHoldings(String userId) async {', 'Future<PortfolioHoldings> getPortfolioHoldings() async {')
content = content.replace("metadata: {'userId': userId},", "metadata: {},")
content = content.replace("metadata: {'userId': userId, 'portfolioId': portfolioId},", "metadata: {'portfolioId': portfolioId},")
content = content.replace("metadata: {'userId': userId, 'limit': limit},", "metadata: {'limit': limit},")
content = content.replace("metadata: {'userId': userId, 'symbol': symbol},", "metadata: {'symbol': symbol},")
content = content.replace('_localDataSource.getLastHoldings(userId)', '_localDataSource.getLastHoldings()')
content = content.replace('_localDataSource.cacheHoldings(userId, holdings)', '_localDataSource.cacheHoldings(holdings)')
content = content.replace('_remoteDataSource.getPortfolioHoldings(userId)', '_remoteDataSource.getPortfolioHoldings()')
content = content.replace('PortfolioHoldingsMapper.fromApiModel(\n        holdingsDto,\n        userId,\n      )', 'PortfolioHoldingsMapper.fromApiModel(\n        holdingsDto,\n      )')
content = content.replace('_lastUserId = userId;', '')
content = content.replace('if (_cachedHoldings != null && _lastUserId == userId) {', 'if (_cachedHoldings != null) {')

content = content.replace('Future<PortfolioSummary> getPortfolioSummary(String userId) async {', 'Future<PortfolioSummary> getPortfolioSummary() async {')
content = content.replace('_localDataSource.getLastSummary(userId)', '_localDataSource.getLastSummary()')
content = content.replace('_remoteDataSource.getPortfolioSummary(userId)', '_remoteDataSource.getPortfolioSummary()')
content = content.replace('PortfolioSummaryMapper.fromApiModel(summaryDto, userId)', 'PortfolioSummaryMapper.fromApiModel(summaryDto)')
content = content.replace('_localDataSource.cacheSummary(userId, summary)', '_localDataSource.cacheSummary(summary)')
content = content.replace('if (_cachedSummary != null && _lastUserId == userId) {', 'if (_cachedSummary != null) {')

content = content.replace('Future<PortfolioHoldings> getPortfolioHoldingsById(\n    String userId,\n    String portfolioId,\n  ) async {', 'Future<PortfolioHoldings> getPortfolioHoldingsById(\n    String portfolioId,\n  ) async {')
content = content.replace('_remoteDataSource.getPortfolioHoldingsById(\n        userId,\n        portfolioId,\n      )', '_remoteDataSource.getPortfolioHoldingsById(\n        portfolioId,\n      )')

content = content.replace('Stream<PortfolioHoldings> watchPortfolioHoldings(String userId) {', 'Stream<PortfolioHoldings> watchPortfolioHoldings() {')
content = content.replace('_ensureWebSocketSubscribed(userId);', '_ensureWebSocketSubscribed();')
content = content.replace('getPortfolioHoldings(userId)', 'getPortfolioHoldings()')
content = content.replace('PortfolioHoldings.empty(userId)', 'PortfolioHoldings.empty()')

content = content.replace('Future<PortfolioSummary> getPortfolioSummaryById(\n    String userId,\n    String portfolioId,\n  ) async {', 'Future<PortfolioSummary> getPortfolioSummaryById(\n    String portfolioId,\n  ) async {')
content = content.replace('_remoteDataSource.getPortfolioSummaryById(\n        userId,\n        portfolioId,\n      )', '_remoteDataSource.getPortfolioSummaryById(\n        portfolioId,\n      )')

content = content.replace('Stream<PortfolioSummary> watchPortfolioSummary(String userId) {', 'Stream<PortfolioSummary> watchPortfolioSummary() {')
content = content.replace('getPortfolioSummary(userId)', 'getPortfolioSummary()')
content = content.replace('PortfolioSummary.empty(userId)', 'PortfolioSummary.empty()')

content = content.replace('Future<PortfolioHolding?> getHoldingDetails(\n    String userId,\n    String symbol,\n  ) async {', 'Future<PortfolioHolding?> getHoldingDetails(\n    String symbol,\n  ) async {')

content = content.replace('Future<List<SectorAllocation>> getSectorAllocation(String userId) async {', 'Future<List<SectorAllocation>> getSectorAllocation() async {')

content = content.replace('Future<List<TopPerformer>> getTopPerformers(\n    String userId, {\n    int limit = 5,\n  }) async {', 'Future<List<TopPerformer>> getTopPerformers({\n    int limit = 5,\n  }) async {')

content = content.replace('Future<List<TopPerformer>> getWorstPerformers(\n    String userId, {\n    int limit = 5,\n  }) async {', 'Future<List<TopPerformer>> getWorstPerformers({\n    int limit = 5,\n  }) async {')

content = content.replace('Future<PortfolioList> getPortfoliosList(String userId) async {', 'Future<PortfolioList> getPortfoliosList() async {')
content = content.replace('_localDataSource.getLastPortfolioList(userId)', '_localDataSource.getLastPortfolioList()')
content = content.replace('_remoteDataSource.getPortfoliosList(\n        userId,\n      )', '_remoteDataSource.getPortfoliosList()')
content = content.replace('PortfolioListMapper.fromApiModel(\n        portfolioListDto,\n        userId,\n      )', 'PortfolioListMapper.fromApiModel(\n        portfolioListDto,\n      )')
content = content.replace('_localDataSource.cachePortfolioList(userId, portfolioList)', '_localDataSource.cachePortfolioList(portfolioList)')
content = content.replace('if (_cachedPortfolioList != null && _lastUserId == userId) {', 'if (_cachedPortfolioList != null) {')

content = content.replace('void _ensureWebSocketSubscribed(String userId) {', 'void _ensureWebSocketSubscribed() {')
content = content.replace('PortfolioHoldingsMapper.fromApiModel(\n                    json,\n                    userId,\n                  )', 'PortfolioHoldingsMapper.fromApiModel(\n                    json,\n                  )')
content = content.replace("PortfolioSummaryMapper.fromApiModel(\n                    json['summary'],\n                    userId,\n                  )", "PortfolioSummaryMapper.fromApiModel(\n                    json['summary'],\n                  )")

# Clean up _lastUserId field
content = content.replace('String? _lastUserId;', '')
content = content.replace('_lastUserId = null;', '')

with open('am-modern-ui/am_portfolio_ui/lib/features/portfolio/internal/data/repositories/portfolio_repository_impl.dart', 'w') as f:
    f.write(content)
