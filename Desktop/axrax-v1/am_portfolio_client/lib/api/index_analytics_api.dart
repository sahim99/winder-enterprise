//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class IndexAnalyticsApi {
  IndexAnalyticsApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Get advanced index analytics
  ///
  /// Retrieves comprehensive analytics for a market index with customizable components and timeframes
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] indexSymbol (required):
  ///
  /// * [AdvancedAnalyticsRequest] advancedAnalyticsRequest (required):
  Future<Response> getAdvancedAnalytics1WithHttpInfo(String indexSymbol, AdvancedAnalyticsRequest advancedAnalyticsRequest,) async {
    // ignore: prefer_const_declarations
    final path = r'/api/v1/analytics/index/{indexSymbol}/advanced'
      .replaceAll('{indexSymbol}', indexSymbol);

    // ignore: prefer_final_locals
    Object? postBody = advancedAnalyticsRequest;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>['application/json'];


    return apiClient.invokeAPI(
      path,
      'POST',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get advanced index analytics
  ///
  /// Retrieves comprehensive analytics for a market index with customizable components and timeframes
  ///
  /// Parameters:
  ///
  /// * [String] indexSymbol (required):
  ///
  /// * [AdvancedAnalyticsRequest] advancedAnalyticsRequest (required):
  Future<AdvancedAnalyticsResponse?> getAdvancedAnalytics1(String indexSymbol, AdvancedAnalyticsRequest advancedAnalyticsRequest,) async {
    final response = await getAdvancedAnalytics1WithHttpInfo(indexSymbol, advancedAnalyticsRequest,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'AdvancedAnalyticsResponse',) as AdvancedAnalyticsResponse;
    
    }
    return null;
  }
}
