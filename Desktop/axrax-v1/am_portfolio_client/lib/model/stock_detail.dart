//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class StockDetail {
  /// Returns a new [StockDetail] instance.
  StockDetail({
    this.symbol,
    this.name,
    this.price,
    this.change,
    this.changePercent,
    this.quantity,
    this.value,
    this.weight,
    this.color,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? symbol;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? name;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? price;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? change;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? changePercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? quantity;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? value;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? weight;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? color;

  @override
  bool operator ==(Object other) => identical(this, other) || other is StockDetail &&
    other.symbol == symbol &&
    other.name == name &&
    other.price == price &&
    other.change == change &&
    other.changePercent == changePercent &&
    other.quantity == quantity &&
    other.value == value &&
    other.weight == weight &&
    other.color == color;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (symbol == null ? 0 : symbol!.hashCode) +
    (name == null ? 0 : name!.hashCode) +
    (price == null ? 0 : price!.hashCode) +
    (change == null ? 0 : change!.hashCode) +
    (changePercent == null ? 0 : changePercent!.hashCode) +
    (quantity == null ? 0 : quantity!.hashCode) +
    (value == null ? 0 : value!.hashCode) +
    (weight == null ? 0 : weight!.hashCode) +
    (color == null ? 0 : color!.hashCode);

  @override
  String toString() => 'StockDetail[symbol=$symbol, name=$name, price=$price, change=$change, changePercent=$changePercent, quantity=$quantity, value=$value, weight=$weight, color=$color]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.symbol != null) {
      json[r'symbol'] = this.symbol;
    } else {
      json[r'symbol'] = null;
    }
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.price != null) {
      json[r'price'] = this.price;
    } else {
      json[r'price'] = null;
    }
    if (this.change != null) {
      json[r'change'] = this.change;
    } else {
      json[r'change'] = null;
    }
    if (this.changePercent != null) {
      json[r'changePercent'] = this.changePercent;
    } else {
      json[r'changePercent'] = null;
    }
    if (this.quantity != null) {
      json[r'quantity'] = this.quantity;
    } else {
      json[r'quantity'] = null;
    }
    if (this.value != null) {
      json[r'value'] = this.value;
    } else {
      json[r'value'] = null;
    }
    if (this.weight != null) {
      json[r'weight'] = this.weight;
    } else {
      json[r'weight'] = null;
    }
    if (this.color != null) {
      json[r'color'] = this.color;
    } else {
      json[r'color'] = null;
    }
    return json;
  }

  /// Returns a new [StockDetail] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static StockDetail? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "StockDetail[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "StockDetail[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return StockDetail(
        symbol: mapValueOfType<String>(json, r'symbol'),
        name: mapValueOfType<String>(json, r'name'),
        price: num.parse('${json[r'price']}'),
        change: num.parse('${json[r'change']}'),
        changePercent: mapValueOfType<double>(json, r'changePercent'),
        quantity: num.parse('${json[r'quantity']}'),
        value: num.parse('${json[r'value']}'),
        weight: mapValueOfType<double>(json, r'weight'),
        color: mapValueOfType<String>(json, r'color'),
      );
    }
    return null;
  }

  static List<StockDetail> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <StockDetail>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = StockDetail.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, StockDetail> mapFromJson(dynamic json) {
    final map = <String, StockDetail>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = StockDetail.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of StockDetail-objects as value to a dart map
  static Map<String, List<StockDetail>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<StockDetail>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = StockDetail.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

