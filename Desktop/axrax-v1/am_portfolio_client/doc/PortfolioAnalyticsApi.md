# am_portfolio_client.api.PortfolioAnalyticsApi

## Load the API package
```dart
import 'package:am_portfolio_client/api.dart';
```

All URIs are relative to *http://localhost:8101*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAdvancedAnalytics**](PortfolioAnalyticsApi.md#getadvancedanalytics) | **POST** /api/v1/analytics/portfolio/{portfolioId}/advanced | Get advanced portfolio analytics


# **getAdvancedAnalytics**
> AdvancedAnalyticsResponse getAdvancedAnalytics(portfolioId, advancedAnalyticsRequest)

Get advanced portfolio analytics

Retrieves comprehensive analytics for a portfolio with customizable components and timeframes

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = PortfolioAnalyticsApi();
final portfolioId = portfolioId_example; // String | 
final advancedAnalyticsRequest = AdvancedAnalyticsRequest(); // AdvancedAnalyticsRequest | 

try {
    final result = api_instance.getAdvancedAnalytics(portfolioId, advancedAnalyticsRequest);
    print(result);
} catch (e) {
    print('Exception when calling PortfolioAnalyticsApi->getAdvancedAnalytics: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **portfolioId** | **String**|  | 
 **advancedAnalyticsRequest** | [**AdvancedAnalyticsRequest**](AdvancedAnalyticsRequest.md)|  | 

### Return type

[**AdvancedAnalyticsResponse**](AdvancedAnalyticsResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

