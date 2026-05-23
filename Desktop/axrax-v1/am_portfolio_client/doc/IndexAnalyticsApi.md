# am_portfolio_client.api.IndexAnalyticsApi

## Load the API package
```dart
import 'package:am_portfolio_client/api.dart';
```

All URIs are relative to *http://localhost:8101*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAdvancedAnalytics1**](IndexAnalyticsApi.md#getadvancedanalytics1) | **POST** /api/v1/analytics/index/{indexSymbol}/advanced | Get advanced index analytics


# **getAdvancedAnalytics1**
> AdvancedAnalyticsResponse getAdvancedAnalytics1(indexSymbol, advancedAnalyticsRequest)

Get advanced index analytics

Retrieves comprehensive analytics for a market index with customizable components and timeframes

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = IndexAnalyticsApi();
final indexSymbol = indexSymbol_example; // String | 
final advancedAnalyticsRequest = AdvancedAnalyticsRequest(); // AdvancedAnalyticsRequest | 

try {
    final result = api_instance.getAdvancedAnalytics1(indexSymbol, advancedAnalyticsRequest);
    print(result);
} catch (e) {
    print('Exception when calling IndexAnalyticsApi->getAdvancedAnalytics1: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **indexSymbol** | **String**|  | 
 **advancedAnalyticsRequest** | [**AdvancedAnalyticsRequest**](AdvancedAnalyticsRequest.md)|  | 

### Return type

[**AdvancedAnalyticsResponse**](AdvancedAnalyticsResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

