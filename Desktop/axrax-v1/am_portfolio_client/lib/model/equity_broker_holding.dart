//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EquityBrokerHolding {
  /// Returns a new [EquityBrokerHolding] instance.
  EquityBrokerHolding({
    this.brokerType,
    this.quantity,
  });

  EquityBrokerHoldingBrokerTypeEnum? brokerType;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? quantity;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EquityBrokerHolding &&
    other.brokerType == brokerType &&
    other.quantity == quantity;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (brokerType == null ? 0 : brokerType!.hashCode) +
    (quantity == null ? 0 : quantity!.hashCode);

  @override
  String toString() => 'EquityBrokerHolding[brokerType=$brokerType, quantity=$quantity]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.brokerType != null) {
      json[r'brokerType'] = this.brokerType;
    } else {
      json[r'brokerType'] = null;
    }
    if (this.quantity != null) {
      json[r'quantity'] = this.quantity;
    } else {
      json[r'quantity'] = null;
    }
    return json;
  }

  /// Returns a new [EquityBrokerHolding] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EquityBrokerHolding? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EquityBrokerHolding[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EquityBrokerHolding[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EquityBrokerHolding(
        brokerType: EquityBrokerHoldingBrokerTypeEnum.fromJson(json[r'brokerType']),
        quantity: mapValueOfType<double>(json, r'quantity'),
      );
    }
    return null;
  }

  static List<EquityBrokerHolding> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EquityBrokerHolding>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EquityBrokerHolding.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EquityBrokerHolding> mapFromJson(dynamic json) {
    final map = <String, EquityBrokerHolding>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EquityBrokerHolding.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EquityBrokerHolding-objects as value to a dart map
  static Map<String, List<EquityBrokerHolding>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EquityBrokerHolding>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EquityBrokerHolding.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


class EquityBrokerHoldingBrokerTypeEnum {
  /// Instantiate a new enum with the provided [value].
  const EquityBrokerHoldingBrokerTypeEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const DHAN = EquityBrokerHoldingBrokerTypeEnum._(r'DHAN');
  static const ZERODHA = EquityBrokerHoldingBrokerTypeEnum._(r'ZERODHA');
  static const MSTOCK = EquityBrokerHoldingBrokerTypeEnum._(r'MSTOCK');
  static const GROW = EquityBrokerHoldingBrokerTypeEnum._(r'GROW');
  static const KOTAK = EquityBrokerHoldingBrokerTypeEnum._(r'KOTAK');

  /// List of all possible values in this [enum][EquityBrokerHoldingBrokerTypeEnum].
  static const values = <EquityBrokerHoldingBrokerTypeEnum>[
    DHAN,
    ZERODHA,
    MSTOCK,
    GROW,
    KOTAK,
  ];

  static EquityBrokerHoldingBrokerTypeEnum? fromJson(dynamic value) => EquityBrokerHoldingBrokerTypeEnumTypeTransformer().decode(value);

  static List<EquityBrokerHoldingBrokerTypeEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EquityBrokerHoldingBrokerTypeEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EquityBrokerHoldingBrokerTypeEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EquityBrokerHoldingBrokerTypeEnum] to String,
/// and [decode] dynamic data back to [EquityBrokerHoldingBrokerTypeEnum].
class EquityBrokerHoldingBrokerTypeEnumTypeTransformer {
  factory EquityBrokerHoldingBrokerTypeEnumTypeTransformer() => _instance ??= const EquityBrokerHoldingBrokerTypeEnumTypeTransformer._();

  const EquityBrokerHoldingBrokerTypeEnumTypeTransformer._();

  String encode(EquityBrokerHoldingBrokerTypeEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a EquityBrokerHoldingBrokerTypeEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EquityBrokerHoldingBrokerTypeEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'DHAN': return EquityBrokerHoldingBrokerTypeEnum.DHAN;
        case r'ZERODHA': return EquityBrokerHoldingBrokerTypeEnum.ZERODHA;
        case r'MSTOCK': return EquityBrokerHoldingBrokerTypeEnum.MSTOCK;
        case r'GROW': return EquityBrokerHoldingBrokerTypeEnum.GROW;
        case r'KOTAK': return EquityBrokerHoldingBrokerTypeEnum.KOTAK;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EquityBrokerHoldingBrokerTypeEnumTypeTransformer] instance.
  static EquityBrokerHoldingBrokerTypeEnumTypeTransformer? _instance;
}


