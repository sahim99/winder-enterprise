//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class PortfolioManagementApi {
  PortfolioManagementApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Get portfolio IDs and names
  ///
  /// Retrieves a lightweight list of portfolio IDs and names for all user portfolios
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolio basic details for
  Future<Response> getPortfolioBasicDetailsWithHttpInfo(String userId,) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/portfolios/list';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

      queryParams.addAll(_queryParams('', 'userId', userId));

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get portfolio IDs and names
  ///
  /// Retrieves a lightweight list of portfolio IDs and names for all user portfolios
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolio basic details for
  Future<List<PortfolioBasicInfo>?> getPortfolioBasicDetails(String userId,) async {
    final response = await getPortfolioBasicDetailsWithHttpInfo(userId,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<PortfolioBasicInfo>') as List)
        .cast<PortfolioBasicInfo>()
        .toList(growable: false);

    }
    return null;
  }

  /// Get portfolio by ID
  ///
  /// Retrieves detailed portfolio information for a specific portfolio ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] portfolioId (required):
  ///   Portfolio ID (UUID format)
  Future<Response> getPortfolioByIdWithHttpInfo(String portfolioId,) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/portfolios/{portfolioId}'
      .replaceAll('{portfolioId}', portfolioId);

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get portfolio by ID
  ///
  /// Retrieves detailed portfolio information for a specific portfolio ID
  ///
  /// Parameters:
  ///
  /// * [String] portfolioId (required):
  ///   Portfolio ID (UUID format)
  Future<PortfolioModelV1?> getPortfolioById(String portfolioId,) async {
    final response = await getPortfolioByIdWithHttpInfo(portfolioId,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'PortfolioModelV1',) as PortfolioModelV1;
    
    }
    return null;
  }

  /// Get portfolio holdings
  ///
  /// Retrieves all holdings across portfolios for a user with current values. Optionally filter by specific portfolio ID.
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolio holdings for
  ///
  /// * [String] portfolioId:
  ///   Optional portfolio ID to filter results for specific portfolio
  ///
  /// * [int] page:
  ///
  /// * [int] size:
  ///
  /// * [String] interval:
  Future<Response> getPortfolioHoldingsWithHttpInfo(String userId, { String? portfolioId, int? page, int? size, String? interval, }) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/portfolios/holdings';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

      queryParams.addAll(_queryParams('', 'userId', userId));
    if (portfolioId != null) {
      queryParams.addAll(_queryParams('', 'portfolioId', portfolioId));
    }
    if (page != null) {
      queryParams.addAll(_queryParams('', 'page', page));
    }
    if (size != null) {
      queryParams.addAll(_queryParams('', 'size', size));
    }
    if (interval != null) {
      queryParams.addAll(_queryParams('', 'interval', interval));
    }

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get portfolio holdings
  ///
  /// Retrieves all holdings across portfolios for a user with current values. Optionally filter by specific portfolio ID.
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolio holdings for
  ///
  /// * [String] portfolioId:
  ///   Optional portfolio ID to filter results for specific portfolio
  ///
  /// * [int] page:
  ///
  /// * [int] size:
  ///
  /// * [String] interval:
  Future<PortfolioHoldings?> getPortfolioHoldings(String userId, { String? portfolioId, int? page, int? size, String? interval, }) async {
    final response = await getPortfolioHoldingsWithHttpInfo(userId,  portfolioId: portfolioId, page: page, size: size, interval: interval, );
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'PortfolioHoldings',) as PortfolioHoldings;
    
    }
    return null;
  }

  /// Get portfolio summary
  ///
  /// Retrieves a summary of all portfolios for a user with performance metrics. Optionally filter by specific portfolio ID.
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolio summary for
  ///
  /// * [String] portfolioId:
  ///   Optional portfolio ID to filter results for specific portfolio
  ///
  /// * [int] page:
  ///
  /// * [int] size:
  ///
  /// * [String] interval:
  Future<Response> getPortfolioSummaryWithHttpInfo(String userId, { String? portfolioId, int? page, int? size, String? interval, }) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/portfolios/summary';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

      queryParams.addAll(_queryParams('', 'userId', userId));
    if (portfolioId != null) {
      queryParams.addAll(_queryParams('', 'portfolioId', portfolioId));
    }
    if (page != null) {
      queryParams.addAll(_queryParams('', 'page', page));
    }
    if (size != null) {
      queryParams.addAll(_queryParams('', 'size', size));
    }
    if (interval != null) {
      queryParams.addAll(_queryParams('', 'interval', interval));
    }

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get portfolio summary
  ///
  /// Retrieves a summary of all portfolios for a user with performance metrics. Optionally filter by specific portfolio ID.
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolio summary for
  ///
  /// * [String] portfolioId:
  ///   Optional portfolio ID to filter results for specific portfolio
  ///
  /// * [int] page:
  ///
  /// * [int] size:
  ///
  /// * [String] interval:
  Future<PortfolioSummaryV1?> getPortfolioSummary(String userId, { String? portfolioId, int? page, int? size, String? interval, }) async {
    final response = await getPortfolioSummaryWithHttpInfo(userId,  portfolioId: portfolioId, page: page, size: size, interval: interval, );
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'PortfolioSummaryV1',) as PortfolioSummaryV1;
    
    }
    return null;
  }

  /// Get all portfolios for user
  ///
  /// Retrieves all portfolios associated with a specific user ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolios for
  Future<Response> getPortfoliosWithHttpInfo(String userId,) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/portfolios';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

      queryParams.addAll(_queryParams('', 'userId', userId));

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get all portfolios for user
  ///
  /// Retrieves all portfolios associated with a specific user ID
  ///
  /// Parameters:
  ///
  /// * [String] userId (required):
  ///   User ID to fetch portfolios for
  Future<List<PortfolioModelV1>?> getPortfolios(String userId,) async {
    final response = await getPortfoliosWithHttpInfo(userId,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<PortfolioModelV1>') as List)
        .cast<PortfolioModelV1>()
        .toList(growable: false);

    }
    return null;
  }
}
